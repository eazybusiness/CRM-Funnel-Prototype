import { useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react'
import FunnelStepper from '../components/FunnelStepper'

function writeDemoEvent(type, payload) {
  if (typeof window === 'undefined') return
  const key = 'crm_funnel_demo_events'
  const events = JSON.parse(localStorage.getItem(key) || '[]')
  events.unshift({ id: crypto.randomUUID?.() || String(Date.now()), ts: new Date().toISOString(), type, payload })
  localStorage.setItem(key, JSON.stringify(events.slice(0, 200)))
}

function writeDemoLead(lead) {
  if (typeof window === 'undefined') return
  const key = 'crm_funnel_demo_leads'
  const leads = JSON.parse(localStorage.getItem(key) || '[]')
  leads.unshift({ id: crypto.randomUUID?.() || String(Date.now()), createdAt: new Date().toISOString(), ...lead })
  localStorage.setItem(key, JSON.stringify(leads.slice(0, 200)))
}

export default function Checkout() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const data = useMemo(() => {
    const q = router.query || {}
    return {
      offer: q.offer ? String(q.offer) : 'Ausgewähltes Angebot',
      amount: q.amount ? String(q.amount) : '197',
      email: q.email ? String(q.email) : '',
      name: q.name ? String(q.name) : '',
      source: q.source ? String(q.source) : 'funnel',
      demo: q.demo ? String(q.demo) : '1'
    }
  }, [router.query])

  const useDemo = data.demo !== '0'

  const handlePay = async () => {
    setLoading(true)
    try {
      writeDemoEvent('payment_initiated', { offer: data.offer, amount: data.amount, email: data.email, mode: useDemo ? 'demo' : 'stripe' })

      if (useDemo) {
        writeDemoLead({ name: data.name, email: data.email, source: `${data.source}_checkout_demo`, offer: data.offer })
        const fakeSession = `demo_${Date.now()}`
        await router.push(`/success?session_id=${encodeURIComponent(fakeSession)}`)
        return
      }

      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: data.email,
          customerName: data.name,
          items: [{ name: data.offer, description: 'Funnel Demo Offer', price: Number(data.amount) || 197, quantity: 1 }]
        })
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Payment creation failed')
      if (json?.url) window.location.href = json.url
    } catch (e) {
      alert(`Checkout Fehler: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Checkout - CRM Funnel Demo</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center text-gray-700 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="font-semibold">Zurück</span>
              </div>
            </Link>
            <div className="text-xl font-bold text-gray-900">Checkout</div>
            <Link href="/demo/crm">
              <div className="text-sm font-semibold text-blue-600 hover:text-blue-800">Demo CRM</div>
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-10">
          <FunnelStepper steps={["Auswahl", "Daten", "Checkout"]} currentStep={3} />

          <motion.div className="bg-white rounded-2xl shadow-lg p-8 mt-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Demo Checkout</h1>
            <p className="text-gray-600 mb-6">
              {useDemo ? (
                <span>
                  <strong>Sandbox-Modus:</strong> Keine echten Zahlungen, keine Secrets.
                </span>
              ) : (
                <span>
                  <strong>Stripe-Modus:</strong> nutzt Server-ENV Variablen (Secrets bleiben serverseitig).
                </span>
              )}
            </p>

            <div className="border rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Angebot</div>
                  <div className="text-lg font-semibold text-gray-900">{data.offer}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Betrag</div>
                  <div className="text-2xl font-bold text-gray-900">{data.amount}€</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Kunde: <span className="font-medium">{data.name || '—'}</span> · E-Mail: <span className="font-medium">{data.email || '—'}</span>
              </div>
            </div>

            <button onClick={handlePay} disabled={loading} className="form-button flex items-center justify-center">
              <CreditCard className="w-5 h-5 mr-2" />
              {loading ? 'Bitte warten…' : useDemo ? 'Demo-Zahlung abschließen' : 'Mit Stripe bezahlen'}
            </button>

            <div className="mt-6 p-4 bg-green-50 rounded-lg flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-green-700 mt-0.5" />
              <div className="text-sm text-green-800">
                <strong>Wichtig:</strong> Auch bei Stripe werden Secrets nie im Frontend veröffentlicht. Sie liegen nur in ENV auf dem Server.
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              Tipp für den Screencast: Öffne parallel <Link className="text-blue-600 font-semibold" href="/demo/crm">/demo/crm</Link>, um Leads/Events live zu zeigen.
            </div>
          </motion.div>
        </main>
      </div>
    </>
  )
}
