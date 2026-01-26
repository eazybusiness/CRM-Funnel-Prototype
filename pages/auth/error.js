import { useEffect, useState } from 'react'

export default function AuthError() {
  const [debugInfo, setDebugInfo] = useState({
    hasSession: false,
    error: null,
    callbackUrl: null,
    timestamp: new Date().toISOString()
  })

  useEffect(() => {
    // Get URL parameters on client side
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const error = urlParams.get('error')
      const callbackUrl = urlParams.get('callbackUrl')
      
      setDebugInfo(prev => ({
        ...prev,
        error,
        callbackUrl
      }))
      
      // Log error to console
      console.log('Auth Error:', { error, callbackUrl })
    }
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Authentication Error</h1>
      <p>Something went wrong with authentication.</p>
      
      <h2>Debug Info:</h2>
      <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
      
      <p style={{ marginTop: '20px' }}>
        <a href="/login" style={{ padding: '10px 20px', background: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '4px', display: 'inline-block' }}>
          Back to Login
        </a>
      </p>
      
      <details style={{ marginTop: '20px' }}>
        <summary>Common Errors</summary>
        <ul>
          <li><strong>CredentialsSignin:</strong> Wrong email or password</li>
          <li><strong>OAuthSignin:</strong> Error with OAuth provider</li>
          <li><strong>OAuthCallback:</strong> Error in OAuth callback</li>
          <li><strong>OAuthCreateAccount:</strong> Could not create account</li>
          <li><strong>EmailCreateAccount:</strong> Could not create account</li>
          <li><strong>Callback:</strong> Error in callback</li>
          <li><strong>OAuthAccountNotLinked:</strong> Account not linked</li>
          <li><strong>SessionRequired:</strong> Please sign in</li>
          <li><strong>Default:</strong> Unknown error occurred</li>
        </ul>
      </details>
    </div>
  )
}
