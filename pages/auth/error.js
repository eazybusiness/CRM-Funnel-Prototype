'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthError() {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const error = searchParams.get('error')
  const callbackUrl = searchParams.get('callbackUrl')
  
  useEffect(() => {
    // Log error to console for debugging
    console.log('Auth Error:', { error, callbackUrl, hasSession: !!session })
  }, [error, callbackUrl, session])
  
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Authentication Error</h1>
      <p>Something went wrong with authentication.</p>
      
      <h2>Debug Info:</h2>
      <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
        {JSON.stringify({
          hasSession: !!session,
          error: error || 'No error parameter',
          callbackUrl: callbackUrl || 'No callback URL',
          timestamp: new Date().toISOString()
        }, null, 2)}
      </pre>
      
      <p style={{ marginTop: '20px' }}>
        <button 
          onClick={() => router.push('/login')}
          style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Back to Login
        </button>
      </p>
    </div>
  )
}
