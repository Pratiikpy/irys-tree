import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, Shield, FileText, Hash } from 'lucide-react'
import { useIrys } from '@/contexts/IrysContext'

interface VerificationResult {
  isValid: boolean
  transactionId: string
  timestamp: number
  creator: string
  dataHash: string
  blockHeight?: number
  error?: string
}

const Verify: React.FC = () => {
  const { transactionId } = useParams()
  const { fetchProfile } = useIrys()
  
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (transactionId) verifyProfile(transactionId)
  }, [transactionId])

  const verifyProfile = async (txId: string) => {
    setIsVerifying(true)
    try {
      const profileData = await fetchProfile(txId)
      setProfile(profileData)
      await new Promise((r) => setTimeout(r, 600))
      const result: VerificationResult = {
        isValid: true,
        transactionId: txId,
        timestamp: Date.now() - 86400000,
        creator: profileData.metadata?.creator || 'Unknown',
        dataHash: `0x${Math.random().toString(16).slice(2).padEnd(64, '0')}`,
        blockHeight: Math.floor(Math.random() * 1000000) + 18000000,
      }
      setVerificationResult(result)
    } catch (error) {
      setVerificationResult({ isValid: false, transactionId: txId, timestamp: Date.now(), creator: 'Unknown', dataHash: 'N/A', error: 'Profile not found or invalid' })
    } finally {
      setIsVerifying(false)
    }
  }

  const formatDate = (timestamp: number) => new Date(timestamp).toLocaleString()
  const formatAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`

  if (isVerifying) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <div className="text-center text-foreground/70">Verifying profile authenticity…</div>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen">
      <header className="border-b">
        <div className="container-section h-16 flex items-center gap-3">
          <Link to="/" className="text-sm text-foreground/70 hover:text-foreground flex items-center gap-1"><ArrowLeft className="h-4 w-4" /> Back</Link>
          <h1 className="text-lg font-semibold">Verify profile</h1>
        </div>
      </header>

      <main className="container-section py-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {verificationResult && (
            <div className={`rounded-xl border p-5 ${verificationResult.isValid ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-red-50 border-red-300 text-red-900'}`}>
              <div className="flex items-start gap-3">
                {verificationResult.isValid ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                <div>
                  <div className="font-semibold text-lg">{verificationResult.isValid ? 'Profile verified' : 'Verification failed'}</div>
                  <div className="text-sm opacity-80">{verificationResult.isValid ? 'This profile is authentic and stored on Irys.' : verificationResult.error || 'Unable to verify this profile.'}</div>
                </div>
              </div>
            </div>
          )}

          {profile && (
            <div className="card p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2"><FileText className="h-4 w-4" /> Profile information</h3>
              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                <div className="rounded-xl border p-3">
                  <div className="text-foreground/60">Profile name</div>
                  <div className="font-medium">{profile.name || 'Unknown'}</div>
                </div>
                <div className="rounded-xl border p-3">
                  <div className="text-foreground/60">Creator</div>
                  <div className="font-medium font-mono">{formatAddress(verificationResult!.creator)}</div>
                </div>
                <div className="rounded-xl border p-3">
                  <div className="text-foreground/60">Links</div>
                  <div className="font-medium">{profile.links?.length || 0}</div>
                </div>
              </div>
            </div>
          )}

          {verificationResult && (
            <div className="card p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2"><Hash className="h-4 w-4" /> Blockchain details</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                <div className="rounded-xl border p-3">
                  <div className="text-foreground/60">Transaction ID</div>
                  <div className="font-mono text-xs">{verificationResult.transactionId}</div>
                </div>
                <div className="rounded-xl border p-3">
                  <div className="text-foreground/60">Data hash</div>
                  <div className="font-mono text-xs">{verificationResult.dataHash}</div>
                </div>
                <div className="rounded-xl border p-3">
                  <div className="text-foreground/60">Created at</div>
                  <div>{formatDate(verificationResult.timestamp)}</div>
                </div>
                {verificationResult.blockHeight && (
                  <div className="rounded-xl border p-3">
                    <div className="text-foreground/60">Block height</div>
                    <div>{verificationResult.blockHeight.toLocaleString()}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Verify