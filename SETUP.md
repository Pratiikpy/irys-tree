# 🚀 Quick Setup Guide - Irys LinkTree

## Step 1: Add Irys Testnet to MetaMask

1. **Open MetaMask**
2. **Click the network dropdown** (usually shows "Ethereum Mainnet")
3. **Click "Add network"**
4. **Click "Add a network manually"**
5. **Fill in these details:**

```
Network Name: Irys Testnet
New RPC URL: https://testnet-rpc.irys.xyz/v1/execution-rpc
Chain ID: 1270
Currency Symbol: IRYS
Block Explorer URL: https://testnet-explorer.irys.xyz
```

6. **Click "Save"**

## Step 2: Get Free IRYS Tokens

1. **Visit the Irys Faucet**: https://irys.xyz/faucet
2. **Connect your MetaMask wallet**
3. **Switch to Irys Testnet** in MetaMask
4. **Click "Request tokens"** to get free IRYS tokens

## Step 3: Use the App

1. **Open the app**: http://localhost:5173/
2. **Click "Connect Wallet"**
3. **Approve the connection** in MetaMask
4. **Create your LinkTree profile** - it's free on testnet!
5. **Share your profile** with the permanent URL

## 🎯 What You Can Do

- ✅ **Create LinkTree profiles** for free
- ✅ **Upload to Irys blockchain** permanently
- ✅ **Customize themes and colors**
- ✅ **Add social media links**
- ✅ **Track analytics**
- ✅ **Discover other profiles**

## 🔧 Troubleshooting

### "Insufficient balance" error?
- Make sure you're on **Irys Testnet** in MetaMask
- Get more free tokens from the [Irys Faucet](https://irys.xyz/faucet)

### "Network not supported" error?
- Add Irys Testnet to MetaMask using the steps above
- Make sure Chain ID is `1270`

### "Transaction failed" error?
- Check that you have IRYS tokens (not ETH)
- Try getting more tokens from the faucet

## 🌐 Network Details

- **Network**: Irys Testnet
- **Chain ID**: 1270
- **Currency**: IRYS
- **Cost**: Free (testnet tokens)
- **Gateway**: https://gateway.irys.xyz

## 🚀 Ready to Deploy?

When you're ready for production, change the network from testnet to mainnet in `src/contexts/IrysContext.tsx`:

```javascript
// Change this line:
.devnet() // Use devnet for development (free transactions)

// To this:
.mainnet() // Use mainnet for production
```

**Note**: Mainnet requires real IRYS tokens and has real costs. 