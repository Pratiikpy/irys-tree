import React, { createContext, useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { WalletState } from '@/types'

interface WalletContextType {
  wallet: WalletState
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  switchNetwork: (chainId: number) => Promise<void>
  getBalance: () => Promise<string>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

interface WalletProviderProps {
  children: React.ReactNode
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: undefined,
    provider: undefined,
    chainId: undefined,
    balance: undefined
  })

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && window.ethereum
  }

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      if (!isMetaMaskInstalled()) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.')
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      
      // Request account access
      const accounts = await provider.send('eth_requestAccounts', [])
      const address = accounts[0]
      
      if (!address) {
        throw new Error('No accounts found')
      }

      // Get network info
      const network = await provider.getNetwork()
      const chainId = Number(network.chainId)

      // Get balance
      const balance = await provider.getBalance(address)
      const balanceInEth = ethers.formatEther(balance)

      setWallet({
        isConnected: true,
        address,
        provider,
        chainId,
        balance: balanceInEth
      })

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          setWallet(prev => ({ ...prev, address: accounts[0] }))
        }
      })

      // Listen for chain changes
      window.ethereum.on('chainChanged', (chainId: string) => {
        setWallet(prev => ({ ...prev, chainId: Number(chainId) }))
      })

    } catch (error) {
      console.error('Error connecting wallet:', error)
      throw error
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: undefined,
      provider: undefined,
      chainId: undefined,
      balance: undefined
    })
  }

  // Switch network
  const switchNetwork = async (chainId: number) => {
    try {
      if (!isMetaMaskInstalled()) {
        throw new Error('MetaMask is not installed')
      }

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }]
      })

      // Update wallet state
      const provider = new ethers.BrowserProvider(window.ethereum)
      const network = await provider.getNetwork()
      setWallet(prev => ({ ...prev, chainId: Number(network.chainId) }))

    } catch (error) {
      console.error('Error switching network:', error)
      throw error
    }
  }

  // Get balance
  const getBalance = async (): Promise<string> => {
    try {
      if (!wallet.provider || !wallet.address) {
        throw new Error('Wallet not connected')
      }

      const balance = await wallet.provider.getBalance(wallet.address)
      const balanceInEth = ethers.formatEther(balance)
      
      setWallet(prev => ({ ...prev, balance: balanceInEth }))
      return balanceInEth

    } catch (error) {
      console.error('Error getting balance:', error)
      throw error
    }
  }

  // Auto-connect on mount if previously connected
  useEffect(() => {
    const checkConnection = async () => {
      if (isMetaMaskInstalled() && window.ethereum.selectedAddress) {
        try {
          await connectWallet()
        } catch (error) {
          console.error('Auto-connect failed:', error)
        }
      }
    }

    checkConnection()
  }, [])

  const value: WalletContextType = {
    wallet,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    getBalance
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
} 