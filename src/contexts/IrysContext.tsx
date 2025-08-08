import React, { createContext, useContext, useEffect, useState } from 'react'
import { IrysState } from '@/types'
import { useWallet } from './WalletContext'
import { WebUploader } from '@irys/web-upload'
import { WebEthereum } from '@irys/web-upload-ethereum'
import { EthersV6Adapter } from '@irys/web-upload-ethereum-ethers-v6'

interface IrysContextType {
  irys: IrysState
  connectIrys: () => Promise<void>
  uploadProfile: (profileData: any, walletAddress: string) => Promise<{ transactionId: string; url: string; receipt: any }>
  getBalance: () => Promise<string>
  fundAccount: (amount: string) => Promise<void>
  fetchProfile: (transactionId: string) => Promise<any>
  fetchProfileByUsername: (username: string) => Promise<any>
}

const IrysContext = createContext<IrysContextType | undefined>(undefined)

export const useIrys = () => {
  const context = useContext(IrysContext)
  if (!context) {
    throw new Error('useIrys must be used within an IrysProvider')
  }
  return context
}

interface IrysProviderProps {
  children: React.ReactNode
}

export const IrysProvider: React.FC<IrysProviderProps> = ({ children }) => {
  const { wallet } = useWallet()
  const [irys, setIrys] = useState<IrysState>({
    uploader: undefined,
    isConnected: false,
    balance: undefined,
    isUploading: false
  })

  // Connect to Irys with modern SDK
  const connectIrys = async () => {
    try {
      if (!wallet.provider) {
        throw new Error('Wallet not connected')
      }

      setIrys(prev => ({ ...prev, isUploading: true }))

      // Create Irys uploader with modern SDK
      const irysUploader = await WebUploader(WebEthereum)
        .withAdapter(EthersV6Adapter(wallet.provider))
        .withRpc("https://testnet-rpc.irys.xyz/v1/execution-rpc") // Irys testnet RPC
        .devnet() // Use devnet for development (free transactions)

      // Get balance
      const balance = await irysUploader.getBalance()
      const balanceInIrys = (Number(balance) / 1e18).toString()

      setIrys({
        uploader: irysUploader,
        isConnected: true,
        balance: balanceInIrys,
        isUploading: false
      })

    } catch (error) {
      console.error('Error connecting to Irys:', error)
      setIrys(prev => ({ ...prev, isUploading: false }))
      throw error
    }
  }

  // Upload profile to Irys
  const uploadProfile = async (profileData: any, walletAddress: string) => {
    try {
      if (!irys.uploader) {
        throw new Error('Irys not connected')
      }

      setIrys(prev => ({ ...prev, isUploading: true }))

      // Prepare profile data with metadata
      const profileWithMetadata = {
        ...profileData,
        metadata: {
          ...profileData.metadata,
          updatedAt: Date.now(),
          creator: walletAddress
        }
      }

      // Create tags for searchability
      const tags = [
        { name: "Content-Type", value: "application/json" },
        { name: "App-Name", value: "IrysLinkTree" },
        { name: "App-Version", value: "1.0.0" },
        { name: "Profile-Type", value: "linktree" },
        { name: "Creator", value: walletAddress },
        { name: "Name", value: profileData.name },
        { name: "Username", value: profileData.username }, // Add username tag
        { name: "Public", value: profileData.metadata.isPublic ? "true" : "false" }
      ]

      // Upload to Irys testnet
      const receipt = await irys.uploader.upload(JSON.stringify(profileWithMetadata), { tags })

      // Store username mapping
      await storeUsernameMapping(profileData.username, receipt.id)

      setIrys(prev => ({ ...prev, isUploading: false }))

      return {
        transactionId: receipt.id,
        url: `https://devnet.irys.xyz/${receipt.id}`,
        receipt
      }

    } catch (error) {
      console.error('Error uploading profile:', error)
      setIrys(prev => ({ ...prev, isUploading: false }))
      throw error
    }
  }

  // Store username to transactionId mapping
  const storeUsernameMapping = async (username: string, transactionId: string) => {
    try {
      if (!irys.uploader) {
        throw new Error('Irys not connected')
      }

      const mappingData = {
        username,
        transactionId,
        timestamp: Date.now()
      }

      const tags = [
        { name: "Content-Type", value: "application/json" },
        { name: "App-Name", value: "IrysLinkTree" },
        { name: "Mapping-Type", value: "username-to-transaction" },
        { name: "Username", value: username }
      ]

      await irys.uploader.upload(JSON.stringify(mappingData), { tags })
    } catch (error) {
      console.error('Error storing username mapping:', error)
      // Don't throw error here as it's not critical for profile creation
    }
  }

  // Fetch profile by username
  const fetchProfileByUsername = async (username: string) => {
    try {
      // First, try to find the username mapping
      const mappingResponse = await fetch(`https://devnet.irys.xyz/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              transactions(
                tags: [
                  { name: "App-Name", values: ["IrysLinkTree"] }
                  { name: "Mapping-Type", values: ["username-to-transaction"] }
                  { name: "Username", values: ["${username}"] }
                ]
                first: 1
                order: DESC
              ) {
                edges {
                  node {
                    id
                    tags {
                      name
                      value
                    }
                  }
                }
              }
            }
          `
        })
      })

      if (!mappingResponse.ok) {
        throw new Error('Failed to fetch username mapping')
      }

      const mappingData = await mappingResponse.json()
      
      if (!mappingData.data?.transactions?.edges?.length) {
        throw new Error('Username not found')
      }

      const mappingTransactionId = mappingData.data.transactions.edges[0].node.id
      
      // Fetch the mapping data
      const mappingResponse2 = await fetch(`https://devnet.irys.xyz/${mappingTransactionId}`)
      if (!mappingResponse2.ok) {
        throw new Error('Failed to fetch mapping data')
      }

      const mapping = await mappingResponse2.json()
      const transactionId = mapping.transactionId

      // Now fetch the actual profile using the transactionId
      const profileResponse = await fetch(`https://devnet.irys.xyz/${transactionId}`)
      if (!profileResponse.ok) {
        throw new Error('Profile not found')
      }

      return await profileResponse.json()
    } catch (error) {
      console.error('Error fetching profile by username:', error)
      throw error
    }
  }

  // Fetch profile from Irys
  const fetchProfile = async (transactionId: string) => {
    try {
      // Use the correct Irys devnet gateway URL
      const response = await fetch(`https://devnet.irys.xyz/${transactionId}`)
      if (!response.ok) {
        throw new Error('Profile not found')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching profile:', error)
      throw error
    }
  }

  // Get Irys balance
  const getBalance = async (): Promise<string> => {
    try {
      if (!irys.uploader) {
        throw new Error('Irys not connected')
      }

      const balance = await irys.uploader.getBalance()
      const balanceInIrys = (Number(balance) / 1e18).toString()
      
      setIrys(prev => ({ ...prev, balance: balanceInIrys }))
      return balanceInIrys

    } catch (error) {
      console.error('Error getting Irys balance:', error)
      throw error
    }
  }

  // Fund Irys account
  const fundAccount = async (amount: string) => {
    try {
      if (!irys.uploader) {
        throw new Error('Irys not connected')
      }

      const amountInWei = (parseFloat(amount) * 1e18).toString()
      await irys.uploader.fund(amountInWei)

      // Update balance after funding
      await getBalance()

    } catch (error) {
      console.error('Error funding account:', error)
      throw error
    }
  }

  // Auto-connect to Irys when wallet is connected
  useEffect(() => {
    if (wallet.isConnected && wallet.provider && !irys.isConnected) {
      connectIrys().catch(console.error)
    }
  }, [wallet.isConnected, wallet.provider])

  const value: IrysContextType = {
    irys,
    connectIrys,
    uploadProfile,
    getBalance,
    fundAccount,
    fetchProfile,
    fetchProfileByUsername
  }

  return (
    <IrysContext.Provider value={value}>
      {children}
    </IrysContext.Provider>
  )
} 