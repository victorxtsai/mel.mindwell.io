import { useState } from 'react'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { app } from '@/src/firebaseConfig' // adjust path to your Firebase config

const db = getFirestore(app)

export default function Notify() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await addDoc(collection(db, 'users-waitlist'), {
        email,
        timestamp: serverTimestamp(),
      })
      setStatus('success')
      setEmail('')
    } catch (error) {
      console.error('Error saving email:', error)
      setStatus('error')
    }
  }

  return (
    <div className="bg-transparent py-16 sm:py-24">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-transparent px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
          <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Get notified when Mel is available!
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-center text-lg text-gray-300">
            Be the first to know when we go live — sign up for updates!
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-md gap-x-4">
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-white sm:text-sm/6"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex-none rounded-md bg-[#2F52E0] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#1098F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {status === 'loading' ? 'Sending...' : 'Notify me'}
            </button>
          </form>

          {status === 'success' && (
            <p className="mt-4 text-center text-green-300 text-sm">You're on the list!</p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-center text-red-300 text-sm">Something went wrong. Try again.</p>
          )}

          <svg viewBox="0 0 1024 1024" aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-x-1/2">
            <circle r={512} cx={512} cy={512} fill="url(#gradient)" fillOpacity="0" />
            <defs>
              <radialGradient
                id="gradient"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
