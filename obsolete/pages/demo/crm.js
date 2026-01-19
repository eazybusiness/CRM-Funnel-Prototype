import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Database, RefreshCcw, Trash2 } from 'lucide-react'

function read(key) {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem(key) || '[]')
}

function clear(key) {
  if (typeof window === 'undefined') return
  localStorage.removeItem(key)
}

export default function DemoCrm() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 1500)
    return () => clearInterval(t)
  }, [])

  const leads = useMemo(() => read('crm_funnel_demo_leads'), [tick])
  const events = useMemo(() => read('crm_funnel_demo_events'), [tick])

  return (
    <>
      <Head>
        <title>Demo CRM Dashboard</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center text-slate-700 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="font-semibold">Zurück</span>
              </div>
            </Link>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <Database className="w-6 h-6" />
              Demo CRM Dashboard
            </div>
            <button onClick={() => setTick(x => x + 1)} className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" /> Refresh
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-2 gap-8">
            <section className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">Leads ({leads.length})</h2>
                <button
                  onClick={() => {
                    clear('crm_funnel_demo_leads')
                    setTick(x => x + 1)
                  }}
                  className="text-sm font-semibold text-red-600 hover:text-red-800 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Leeren
                </button>
              </div>

              <div className="space-y-3 max-h-[70vh] overflow-auto">
                {leads.length === 0 ? (
                  <div className="text-sm text-slate-600">Noch keine Leads. Starte den Funnel und sende ein Formular ab.</div>
                ) : (
                  leads.map((l) => (
                    <div key={l.id} className="border rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-slate-900">{l.name || '—'}</div>
                        <div className="text-xs text-slate-500">{l.createdAt}</div>
                      </div>
                      <div className="text-sm text-slate-700">E-Mail: {l.email || '—'}</div>
                      <div className="text-sm text-slate-700">Source: {l.source || '—'}</div>
                      <div className="text-sm text-slate-700">Offer: {l.offer || l.product || l.course || l.plan || '—'}</div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">Funnel Events ({events.length})</h2>
                <button
                  onClick={() => {
                    clear('crm_funnel_demo_events')
                    setTick(x => x + 1)
                  }}
                  className="text-sm font-semibold text-red-600 hover:text-red-800 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Leeren
                </button>
              </div>

              <div className="space-y-3 max-h-[70vh] overflow-auto">
                {events.length === 0 ? (
                  <div className="text-sm text-slate-600">Noch keine Events. Nutze den Funnel (Auswahl, Submit, Checkout).</div>
                ) : (
                  events.map((e) => (
                    <div key={e.id} className="border rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-slate-900">{e.type}</div>
                        <div className="text-xs text-slate-500">{e.ts}</div>
                      </div>
                      <pre className="text-xs text-slate-700 mt-2 whitespace-pre-wrap">{JSON.stringify(e.payload, null, 2)}</pre>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <div className="mt-10 text-sm text-slate-600">
            Dieses Dashboard ist absichtlich ein <strong>Demo-CRM</strong> für deinen Screencast (läuft komplett im Browser). In der echten Umsetzung wird das an HubSpot/Brevo/ActiveCampaign/GoHighLevel angebunden.
          </div>
        </main>
      </div>
    </>
  )
}
