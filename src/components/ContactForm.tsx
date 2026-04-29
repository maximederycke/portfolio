import { defineStepper } from '@stepperize/react'
import { useState } from 'react'

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

// ─── Stepper ─────────────────────────────────────────────────────────────────

const { Scoped, useStepper } = defineStepper(
  { id: 'type' },
  { id: 'mode' },
  { id: 'budget' },
  { id: 'description' },
  { id: 'contact' },
)

// ─── Types ───────────────────────────────────────────────────────────────────

type ProjectType = 'web' | 'mobile' | 'conseil'
type CollabMode = 'agile' | 'forfait' | 'unknown'
type Budget = '<2k' | '2-5k' | '5-10k' | '+10k' | 'unknown'

type FormData = {
  type: ProjectType | ''
  mode: CollabMode | ''
  budget: Budget | ''
  description: string
  nom: string
  email: string
  entreprise: string
}

const initial: FormData = {
  type: '', mode: '', budget: '', description: '', nom: '', email: '', entreprise: '',
}

// ─── Entry point ─────────────────────────────────────────────────────────────

const validModes: CollabMode[] = ['agile', 'forfait', 'unknown']

function getInitialMode(): CollabMode | '' {
  if (typeof window === 'undefined') return ''
  const m = new URLSearchParams(window.location.search).get('mode')
  return validModes.includes(m as CollabMode) ? (m as CollabMode) : ''
}

export default function ContactForm() {
  return (
    <Scoped>
      <FormInner />
    </Scoped>
  )
}

// ─── Main form ───────────────────────────────────────────────────────────────

function FormInner() {
  const stepper = useStepper()
  const [initialMode] = useState<CollabMode | ''>(getInitialMode)
  const [data, setData] = useState<FormData>({ ...initial, mode: initialMode })

  const [hp, setHp] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData(prev => ({ ...prev, [key]: value }))

  const canProceed = (): boolean => {
    switch (stepper.state.current.data.id) {
      case 'type': return !!data.type
      case 'mode': return !!data.mode
      case 'budget': return !!data.budget
      case 'description': return data.description.trim().length >= 20
      case 'contact': return !!(data.nom.trim() && isValidEmail(data.email))
      default: return true
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const url = import.meta.env.PUBLIC_API_URL ?? '/api/contact'
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _hp: hp }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError('Une erreur est survenue. Réessayez ou écrivez-moi directement à mderycke.pro@gmail.com')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) return <Success />

  const { current, all, isFirst, isLast } = stepper.state
  const index = all.findIndex(s => s.id === current.data.id)
  const progress = ((index + 1) / all.length) * 100

  return (
    <div className="max-w-xl">
      {/* Honeypot — invisible pour les humains, les bots le remplissent */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
        <input type="text" name="website" value={hp} onChange={e => setHp(e.target.value)} tabIndex={-1} autoComplete="off" />
      </div>
      <div className="mb-8">
        <div className="h-px bg-zinc-100 w-full mb-3">
          <div
            className="h-px bg-teal-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs font-mono text-zinc-400">Étape {index + 1} / {all.length}</p>
      </div>

      <div className="min-h-72">
        {stepper.flow.switch({
          type: () => <TypeStep value={data.type} onChange={v => set('type', v)} />,
          mode: () => <ModeStep value={data.mode} onChange={v => set('mode', v)} />,
          budget: () => <BudgetStep value={data.budget} onChange={v => set('budget', v)} />,
          description: () => <DescriptionStep value={data.description} onChange={v => set('description', v)} />,
          contact: () => (
            <ContactStep
              nom={data.nom}
              email={data.email}
              entreprise={data.entreprise}
              onChange={(k, v) => set(k as keyof FormData, v)}
            />
          ),
        })}
      </div>

      <div className="flex items-center justify-between mt-10">
        <button
          onClick={() => stepper.navigation.prev()}
          className={`text-sm text-zinc-400 hover:text-zinc-600 transition-colors ${isFirst ? 'invisible' : ''}`}
        >
          ← Retour
        </button>

        {isLast ? (
          <button
            onClick={handleSubmit}
            disabled={!canProceed() || submitting}
            className="px-5 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? 'Envoi en cours…' : 'Envoyer'}
          </button>
        ) : (
          <button
            onClick={() => stepper.navigation.next()}
            disabled={!canProceed()}
            className="px-5 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continuer →
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
    </div>
  )
}

// ─── Step 1 — Type de projet ─────────────────────────────────────────────────

const projectTypes = [
  { value: 'web' as const, label: 'Application web', desc: 'SPA, dashboard, outil interne' },
  { value: 'mobile' as const, label: 'Application mobile', desc: 'React Native / Expo' },
  { value: 'conseil' as const, label: 'Conseil & audit', desc: 'Architecture, revue de code, accompagnement' },
]

function TypeStep({ value, onChange }: { value: string; onChange: (v: ProjectType) => void }) {
  return (
    <div>
      <h2 className="text-lg font-medium text-zinc-900 mb-1">Quel type de projet ?</h2>
      <p className="text-sm text-zinc-400 mb-6">Sélectionnez la catégorie qui correspond le mieux.</p>
      <div className="flex flex-col gap-3">
        {projectTypes.map(opt => (
          <SelectCard
            key={opt.value}
            label={opt.label}
            desc={opt.desc}
            selected={value === opt.value}
            onClick={() => onChange(opt.value)}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Step 2 — Mode de collaboration ──────────────────────────────────────────

const modes = [
  {
    value: 'agile' as const,
    label: 'Agile',
    desc: 'Collaboration itérative sur la durée. TJM fixe, sprints de 2 semaines, périmètre ajustable à chaque cycle.',
  },
  {
    value: 'forfait' as const,
    label: 'Forfait',
    desc: 'Périmètre fixé en amont, livraison à date. Idéal pour une mission bien définie avec un budget cadré.',
  },
  {
    value: 'unknown' as const,
    label: 'Je ne sais pas encore',
    desc: 'Pas de problème, nous en discuterons ensemble.',
  },
]

function ModeStep({ value, onChange }: { value: string; onChange: (v: CollabMode) => void }) {
  return (
    <div>
      <h2 className="text-lg font-medium text-zinc-900 mb-1">Mode de collaboration</h2>
      <p className="text-sm text-zinc-400 mb-6">Comment préférez-vous travailler ensemble ?</p>
      <div className="flex flex-col gap-3">
        {modes.map(opt => (
          <SelectCard
            key={opt.value}
            label={opt.label}
            desc={opt.desc}
            selected={value === opt.value}
            onClick={() => onChange(opt.value)}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Step 3 — Budget ─────────────────────────────────────────────────────────

const budgets = [
  { value: '<2k' as const, label: 'Moins de 2 000 €' },
  { value: '2-5k' as const, label: '2 000 – 5 000 €' },
  { value: '5-10k' as const, label: '5 000 – 10 000 €' },
  { value: '+10k' as const, label: 'Plus de 10 000 €' },
  { value: 'unknown' as const, label: 'Pas encore défini' },
]

function BudgetStep({ value, onChange }: { value: string; onChange: (v: Budget) => void }) {
  return (
    <div>
      <h2 className="text-lg font-medium text-zinc-900 mb-1">Budget estimatif</h2>
      <p className="text-sm text-zinc-400 mb-6">Une fourchette approximative suffit.</p>
      <div className="flex flex-col gap-3">
        {budgets.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors ${
              value === opt.value
                ? 'border-teal-500 text-zinc-900 bg-teal-50/50'
                : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Step 4 — Description ────────────────────────────────────────────────────

function DescriptionStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const len = value.trim().length
  return (
    <div>
      <h2 className="text-lg font-medium text-zinc-900 mb-1">Décrivez votre projet</h2>
      <p className="text-sm text-zinc-400 mb-6">
        Contexte, objectifs, contraintes, délais… Plus c'est précis, mieux je pourrai vous aider.
      </p>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={6}
        placeholder="Mon projet consiste à..."
        className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-teal-500 resize-none transition-colors"
      />
      <p className="text-xs font-mono text-zinc-400 mt-2 text-right">
        {len < 20 ? `${len} / 20 caractères min.` : '✓'}
      </p>
    </div>
  )
}

// ─── Step 5 — Contact ────────────────────────────────────────────────────────

function ContactStep({
  nom, email, entreprise, onChange,
}: {
  nom: string; email: string; entreprise: string
  onChange: (key: string, value: string) => void
}) {
  return (
    <div>
      <h2 className="text-lg font-medium text-zinc-900 mb-1">Vos coordonnées</h2>
      <p className="text-sm text-zinc-400 mb-6">Pour qu'on puisse échanger.</p>
      <div className="flex flex-col gap-4">
        <Field label="Nom *">
          <input
            type="text"
            value={nom}
            onChange={e => onChange('nom', e.target.value)}
            placeholder="Jean Dupont"
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-teal-500 transition-colors"
          />
        </Field>
        <Field label="Email *">
          <input
            type="email"
            value={email}
            onChange={e => onChange('email', e.target.value)}
            placeholder="jean@exemple.com"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-colors ${
              email && !isValidEmail(email) ? 'border-red-300 focus:border-red-400' : 'border-zinc-200 focus:border-teal-500'
            }`}
          />
          {email && !isValidEmail(email) && (
            <p className="text-xs text-red-400 mt-1.5">Adresse email invalide.</p>
          )}
        </Field>
        <Field label="Entreprise">
          <input
            type="text"
            value={entreprise}
            onChange={e => onChange('entreprise', e.target.value)}
            placeholder="Acme SAS (optionnel)"
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-teal-500 transition-colors"
          />
        </Field>
      </div>
    </div>
  )
}

// ─── Success ─────────────────────────────────────────────────────────────────

function Success() {
  return (
    <div className="max-w-xl">
      <p className="text-xs font-mono text-teal-500 mb-4">Message envoyé</p>
      <h2 className="text-2xl font-semibold text-zinc-900 mb-3">Merci !</h2>
      <p className="text-zinc-500 leading-relaxed">
        J'ai bien reçu votre demande et reviendrai vers vous rapidement,
        généralement sous 24h.
      </p>
    </div>
  )
}

// ─── Shared components ───────────────────────────────────────────────────────

function SelectCard({ label, desc, selected, onClick }: {
  label: string; desc: string; selected: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-xl border transition-colors ${
        selected ? 'border-teal-500 bg-teal-50/50' : 'border-zinc-200 hover:border-zinc-300'
      }`}
    >
      <p className={`text-sm font-medium ${selected ? 'text-zinc-900' : 'text-zinc-700'}`}>{label}</p>
      <p className="text-xs text-zinc-400 mt-0.5">{desc}</p>
    </button>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-mono text-zinc-400 mb-1.5">{label}</label>
      {children}
    </div>
  )
}