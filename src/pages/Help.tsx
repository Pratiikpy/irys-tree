import React from 'react'
import { Link } from 'react-router-dom'
import { HelpCircle, MessageCircle, Mail, Github, Globe, Shield, Zap, ArrowLeft } from 'lucide-react'

const Help: React.FC = () => {
  const faqs = [
    { question: 'What is irystree?', answer: 'irystree is a decentralized link-in-bio that stores your profile permanently on the Irys blockchain. Your data is permanent, censorship-resistant, and truly owned by you.' },
    { question: 'How does blockchain storage work?', answer: 'Your profile is uploaded to Irys datachain which provides permanent, decentralized storage. Once uploaded, your profile cannot be altered by others and remains accessible forever.' },
    { question: 'Do I need cryptocurrency to use this?', answer: 'Yes, you need a small amount of ETH to upload your profile to Irys (testnet is free). This is a one-time payment that covers permanent storage.' },
    { question: 'How do I connect my wallet?', answer: "Click 'Connect wallet' on the homepage. We support MetaMask and other EVM wallets. Ensure you have ETH for fees (or testnet tokens)." },
    { question: 'Can I edit my profile after uploading?', answer: 'Profiles are immutable. To update, create a new profile. This ensures permanence and authenticity.' },
    { question: 'Is my data private?', answer: 'Profile data is public on-chain. You control what to share. Transparency and verifiability are core to decentralization.' },
  ]

  return (
    <div className="bg-background min-h-screen">
      <header className="border-b">
        <div className="container-section h-16 flex items-center gap-3">
          <Link to="/" className="text-sm text-foreground/70 hover:text-foreground inline-flex items-center gap-1"><ArrowLeft className="h-4 w-4" /> Back</Link>
          <h1 className="text-lg font-semibold">Help &amp; support</h1>
        </div>
      </header>

      <main className="container-section py-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mx-auto h-16 w-16 rounded-full grid place-items-center bg-secondary"><HelpCircle className="h-8 w-8 text-foreground/70" /></div>
          <h2 className="mt-4 text-3xl font-bold">How can we help?</h2>
          <p className="mt-2 text-foreground/70">Find answers to common questions and get support for irystree.</p>
        </div>

        {/* Quick actions */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-full grid place-items-center bg-blue-100 text-blue-700 mb-3"><MessageCircle className="h-6 w-6" /></div>
            <div className="font-semibold">Get started</div>
            <p className="text-sm text-foreground/60 mt-1">Create your first profile in minutes</p>
            <Link to="/create" className="btn btn-primary mt-4">Create profile</Link>
          </div>
          <div className="card p-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-full grid place-items-center bg-amber-100 text-amber-700 mb-3"><Mail className="h-6 w-6" /></div>
            <div className="font-semibold">Contact support</div>
            <p className="text-sm text-foreground/60 mt-1">Reach our team for help</p>
            <a href="mailto:support@irystree.app" className="btn border mt-4">Email us</a>
          </div>
          <div className="card p-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-full grid place-items-center bg-emerald-100 text-emerald-700 mb-3"><Github className="h-6 w-6" /></div>
            <div className="font-semibold">Open source</div>
            <p className="text-sm text-foreground/60 mt-1">View code and contribute</p>
            <a href="https://github.com/Pratiikpy/irys-tree" target="_blank" rel="noreferrer" className="btn border mt-4">Repository</a>
          </div>
        </div>

        {/* FAQs */}
        <section className="mt-10">
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-4">Frequently asked questions</h3>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div key={i} className="rounded-xl border p-4">
                  <div className="font-medium">{f.question}</div>
                  <p className="text-sm text-foreground/70 mt-1">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose */}
        <section className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-full grid place-items-center bg-blue-100 text-blue-700 mb-3"><Shield className="h-6 w-6" /></div>
            <div className="font-semibold">Permanent storage</div>
            <div className="text-sm text-foreground/60">Profiles never expire or get deleted</div>
          </div>
          <div className="card p-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-full grid place-items-center bg-amber-100 text-amber-700 mb-3"><Globe className="h-6 w-6" /></div>
            <div className="font-semibold">Decentralized</div>
            <div className="text-sm text-foreground/60">No single point of failure or control</div>
          </div>
          <div className="card p-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-full grid place-items-center bg-emerald-100 text-emerald-700 mb-3"><Zap className="h-6 w-6" /></div>
            <div className="font-semibold">One-time payment</div>
            <div className="text-sm text-foreground/60">Pay once, own forever</div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Help