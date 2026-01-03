import { CheckCircle, Circle } from 'lucide-react'

export default function FunnelStepper({ steps, currentStep }) {
  return (
    <div className="bg-white/70 backdrop-blur rounded-xl border border-gray-200 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {steps.map((label, idx) => {
          const step = idx + 1
          const done = step < currentStep
          const active = step === currentStep

          return (
            <div key={label} className="flex items-center gap-3">
              <div className="shrink-0">
                {done ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <Circle className={`w-6 h-6 ${active ? 'text-blue-600' : 'text-gray-300'}`} />
                )}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-semibold ${active ? 'text-gray-900' : done ? 'text-gray-700' : 'text-gray-500'}`}>
                  {label}
                </div>
                <div className="text-xs text-gray-500">Step {step} of {steps.length}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
