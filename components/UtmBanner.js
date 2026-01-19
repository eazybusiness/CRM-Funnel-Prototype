import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Megaphone } from 'lucide-react'

function pickUtm(query) {
  const keys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'fbclid'
  ]

  const out = {}
  for (const k of keys) {
    if (query?.[k]) out[k] = query[k]
  }
  return out
}

export default function UtmBanner() {
  const router = useRouter()

  const utm = useMemo(() => pickUtm(router.query), [router.query])
  const hasAny = Object.keys(utm).length > 0

  if (!hasAny) return null

  return (
    <div className="bg-yellow-50 border-b border-yellow-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            <Megaphone className="w-5 h-5 text-yellow-700" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-yellow-900">Ad / Tracking Demo</div>
            <div className="text-xs text-yellow-800 mt-1 break-words">
              {Object.entries(utm).map(([k, v]) => (
                <span key={k} className="mr-3">
                  <span className="font-medium">{k}:</span> {String(v)}
                </span>
              ))}
            </div>
          </div>
          <div className="text-xs text-yellow-700">(simuliert Meta-Ad Einstieg)</div>
        </div>
      </div>
    </div>
  )
}
