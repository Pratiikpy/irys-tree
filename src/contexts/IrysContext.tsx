import React, { createContext, useContext, useEffect, useState } from 'react'
import { IrysState } from '@/types'
import { useWallet } from './WalletContext'

interface IrysContextType {
  irys: IrysState
  connectIrys: () => Promise<void>
  uploadProfile: (profileData: any, walletAddress: string) => Promise<{ transactionId: string; url: string; receipt: any }>
  getBalance: () => Promise<string>
  fundAccount: (amount: string) => Promise<void>
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

  // Connect to Irys (mock implementation)
  const connectIrys = async () => {
    try {
      if (!wallet.provider) {
        throw new Error('Wallet not connected')
      }

      setIrys(prev => ({ ...prev, isUploading: true }))

      // Mock Irys connection
      await new Promise(resolve => setTimeout(resolve, 1000))

      setIrys({
        uploader: {} as any, // Mock uploader
        isConnected: true,
        balance: "0.1", // Mock balance
        isUploading: false
      })

    } catch (error) {
      console.error('Error connecting to Irys:', error)
      setIrys(prev => ({ ...prev, isUploading: false }))
      throw error
    }
  }

  // Upload profile to Irys (mock implementation)
  const uploadProfile = async (_profileData: any, _walletAddress: string) => {
    try {
      if (!irys.uploader) {
        throw new Error('Irys not connected')
      }

      setIrys(prev => ({ ...prev, isUploading: true }))

      // Mock upload delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      const mockTransactionId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      setIrys(prev => ({ ...prev, isUploading: false }))

      return {
        transactionId: mockTransactionId,
        url: `https://gateway.irys.xyz/${mockTransactionId}`,
        receipt: { id: mockTransactionId }
      }

    } catch (error) {
      console.error('Error uploading profile:', error)
      setIrys(prev => ({ ...prev, isUploading: false }))
      throw error
    }
  }

  // Get Irys balance (mock implementation)
  const getBalance = async (): Promise<string> => {
    try {
      if (!irys.uploader) {
        throw new Error('Irys not connected')
      }

      const mockBalance = "0.1"
      setIrys(prev => ({ ...prev, balance: mockBalance }))
      return mockBalance

    } catch (error) {
      console.error('Error getting Irys balance:', error)
      throw error
    }
  }

  // Fund Irys account (mock implementation)
  const fundAccount = async (_amount: string) => {
    try {
      if (!irys.uploader) {
        throw new Error('Irys not connected')
      }

      // Mock funding delay
      await new Promise(resolve => setTimeout(resolve, 1000))

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
    fundAccount
  }

  return (
    <IrysContext.Provider value={value}>
      {children}
    </IrysContext.Provider>
  )
} 