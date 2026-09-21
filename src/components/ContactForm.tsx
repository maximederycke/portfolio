import { defineStepper } from '@stepperize/react'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

const CONTACT_EMAIL = 'mderycke.pro@gmail.com'

// Limites alignées sur la validation de api/contact.ts
const MAX = { nom: 100, email: 200, entreprise: 100, description: 2000 }
const SEND_TIMEOUT_MS = 15_000

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
type SendError = 'rate' | 'timeout' | 'generic'

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

const STEP_TITLE_ID = 'step-title'

function FormInner() {
  const stepper = useStepper()
  const [initialMode] = useState<CollabMode | ''>(getInitialMode)
  const [data, setData] = useState<FormData>({ ...initial, mode: initialMode })

  const [hp, setHp] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<SendError | null>(null)

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData(prev => ({ ...prev, [key]: value }))

  // À chaque changement d'étape, le focus passe sur le titre : sinon il retombe sur <body>
  // (le bouton cliqué disparaît) et un lecteur d'écran n'annonce rien.
  const stepId = stepper.state.current.data.id
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    document.getElementById(STEP_TITLE_ID)?.focus()
  }, [stepId])

  const canProceed = (): boolean => {
    switch (stepId) {
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
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS)
    try {
      const url = import.meta.env.PUBLIC_API_URL ?? '/api/contact'
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _hp: hp }),
        signal: controller.signal,
      })
      if (res.status === 429) {
        setError('rate')
        return
      }
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError(controller.signal.aborted ? 'timeout' : 'generic')
    } finally {
      clearTimeout(timer)
      setSubmitting(false)
    }
  }

  if (submitted) return <Success />

  const { all, isFirst, isLast } = stepper.state
  const index = all.findIndex(s => s.id === stepId)
  const progress = ((index + 1) / all.length) * 100

  return (
    <div className="max-w-xl">
      {/* Honeypot — invisible pour les humains, les bots le remplissent */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
        <input type="text" name="website" value={hp} onChange={e => setHp(e.target.value)} tabIndex={-1} autoComplete="off" />
      </div>
      <div className="mb-8">
        <div
          role="progressbar"
          aria-label="Progression du formulaire"
          aria-valuemin={1}
          aria-valuemax={all.length}
          aria-valuenow={index + 1}
          aria-valuetext={`Étape ${index + 1} sur ${all.length}`}
          className="h-px bg-zinc-100 w-full mb-3"
        >
          <div
            className="h-px bg-teal-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs font-mono text-zinc-500" aria-hidden="true">Étape {index + 1} / {all.length}</p>
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
          type="button"
          onClick={() => stepper.navigation.prev()}
          className={`-my-3 inline-flex min-h-11 items-center text-sm text-zinc-500 hover:text-zinc-600 transition-colors ${isFirst ? 'invisible' : ''}`}
        >
          ← Retour
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed() || submitting}
            className="px-5 py-3 sm:py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 active:translate-y-px transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? 'Envoi en cours…' : 'Envoyer'}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => stepper.navigation.next()}
            disabled={!canProceed()}
            className="px-5 py-3 sm:py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 active:translate-y-px transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continuer →
          </button>
        )}
      </div>

      {error && <SendErrorMessage kind={error} />}
    </div>
  )
}

// ─── Erreur d'envoi ──────────────────────────────────────────────────────────

const errorCopy: Record<SendError, string> = {
  rate: 'Trop de demandes pour le moment, réessayez dans une heure.',
  timeout: "L'envoi prend trop de temps. Vérifiez votre connexion puis réessayez.",
  generic: 'Une erreur est survenue. Réessayez.',
}

function SendErrorMessage({ kind }: { kind: SendError }) {
  return (
    <p role="alert" className="text-sm text-red-700 mt-4">
      {errorCopy[kind]} Vous pouvez aussi m'écrire directement à{' '}
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="underline underline-offset-2 hover:text-red-800 transition-colors"
      >
        {CONTACT_EMAIL}
      </a>
    </p>
  )
}

// ─── Titre d'étape ───────────────────────────────────────────────────────────

function StepTitle({ title, hint }: { title: string; hint: string }) {
  return (
    <>
      <h2 id={STEP_TITLE_ID} tabIndex={-1} className="text-lg font-medium text-zinc-900 mb-1 focus:outline-none">
        {title}
      </h2>
      <p className="text-sm text-zinc-500 mb-6">{hint}</p>
    </>
  )
}

// ─── Groupe de choix (radios accessibles) ────────────────────────────────────

type Option<T extends string> = { value: T; label: string; desc?: string }

function ChoiceGroup<T extends string>({
  options, value, onChange,
}: {
  options: Option<T>[]
  value: string
  onChange: (v: T) => void
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const selectedIndex = options.findIndex(o => o.value === value)
  const tabbable = selectedIndex === -1 ? 0 : selectedIndex

  const move = (from: number, delta: number) => {
    const next = (from + delta + options.length) % options.length
    onChange(options[next].value)
    refs.current[next]?.focus()
  }

  return (
    <div role="radiogroup" aria-labelledby={STEP_TITLE_ID} className="flex flex-col gap-3">
      {options.map((opt, i) => {
        const selected = opt.value === value
        return (
          <button
            key={opt.value}
            ref={el => { refs.current[i] = el }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={i === tabbable ? 0 : -1}
            onClick={() => onChange(opt.value)}
            onKeyDown={e => {
              if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); move(i, 1) }
              else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); move(i, -1) }
            }}
            className={`flex w-full items-start gap-3 text-left px-4 py-3.5 rounded-xl border transition-colors ${
              selected ? 'border-teal-500 bg-teal-50/50' : 'border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <span className="flex-auto">
              <span className={`block text-sm font-medium ${selected ? 'text-zinc-900' : 'text-zinc-700'}`}>{opt.label}</span>
              {opt.desc && <span className="mt-0.5 block text-xs text-zinc-500">{opt.desc}</span>}
            </span>
            {/* Repère non colorimétrique : le rond plein indique le choix */}
            <span
              aria-hidden="true"
              className={`mt-0.5 flex size-4 flex-none items-center justify-center rounded-full border ${
                selected ? 'border-zinc-900' : 'border-zinc-300'
              }`}
            >
              {selected && <span className="size-2 rounded-full bg-zinc-900" />}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// ─── Step 1 — Type de projet ─────────────────────────────────────────────────

const projectTypes: Option<ProjectType>[] = [
  { value: 'web', label: 'Application web', desc: 'SPA, dashboard, outil interne' },
  { value: 'mobile', label: 'Application mobile', desc: 'React Native / Expo' },
  { value: 'conseil', label: 'Conseil & audit', desc: 'Architecture, revue de code, accompagnement' },
]

function TypeStep({ value, onChange }: { value: string; onChange: (v: ProjectType) => void }) {
  return (
    <div>
      <StepTitle title="Quel type de projet ?" hint="Sélectionnez la catégorie qui correspond le mieux." />
      <ChoiceGroup options={projectTypes} value={value} onChange={onChange} />
    </div>
  )
}

// ─── Step 2 — Mode de collaboration ──────────────────────────────────────────

const modes: Option<CollabMode>[] = [
  {
    value: 'agile',
    label: 'Agile',
    desc: 'Collaboration itérative sur la durée. TJM fixe, sprints de 2 semaines, périmètre ajustable à chaque cycle.',
  },
  {
    value: 'forfait',
    label: 'Forfait',
    desc: 'Périmètre fixé en amont, livraison à date. Idéal pour une mission bien définie avec un budget cadré.',
  },
  {
    value: 'unknown',
    label: 'Je ne sais pas encore',
    desc: 'Pas de problème, nous en discuterons ensemble.',
  },
]

function ModeStep({ value, onChange }: { value: string; onChange: (v: CollabMode) => void }) {
  return (
    <div>
      <StepTitle title="Mode de collaboration" hint="Comment préférez-vous travailler ensemble ?" />
      <ChoiceGroup options={modes} value={value} onChange={onChange} />
    </div>
  )
}

// ─── Step 3 — Budget ─────────────────────────────────────────────────────────

const budgets: Option<Budget>[] = [
  { value: '<2k', label: 'Moins de 2 000 €' },
  { value: '2-5k', label: '2 000 – 5 000 €' },
  { value: '5-10k', label: '5 000 – 10 000 €' },
  { value: '+10k', label: 'Plus de 10 000 €' },
  { value: 'unknown', label: 'Pas encore défini' },
]

function BudgetStep({ value, onChange }: { value: string; onChange: (v: Budget) => void }) {
  return (
    <div>
      <StepTitle title="Budget estimatif" hint="Une fourchette approximative suffit." />
      <ChoiceGroup options={budgets} value={value} onChange={onChange} />
    </div>
  )
}

// ─── Step 4 — Description ────────────────────────────────────────────────────

function DescriptionStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const uid = useId()
  const len = value.trim().length
  const enough = len >= 20
  return (
    <div>
      <StepTitle
        title="Décrivez votre projet"
        hint="Contexte, objectifs, contraintes, délais… Plus c'est précis, mieux je pourrai vous aider."
      />
      <textarea
        aria-labelledby={STEP_TITLE_ID}
        aria-describedby={`${uid}-count`}
        name="description"
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={6}
        maxLength={MAX.description}
        placeholder="Mon projet consiste à..."
        className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-base md:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-teal-500 resize-none transition-colors"
      />
      <p id={`${uid}-count`} className="text-xs font-mono text-zinc-500 mt-2 text-right">
        {enough ? (
          <>
            <span aria-hidden="true">✓</span>
            <span className="sr-only">Longueur suffisante</span>
          </>
        ) : (
          `${len} / 20 caractères min.`
        )}
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
  const uid = useId()
  const [emailTouched, setEmailTouched] = useState(false)
  // Pas d'erreur pendant la frappe du début d'adresse : on attend le « @ » ou la sortie du champ
  const emailInvalid = !!email && !isValidEmail(email) && (emailTouched || email.includes('@'))

  return (
    <div>
      <StepTitle title="Vos coordonnées" hint="Pour qu'on puisse échanger." />
      <div className="flex flex-col gap-4">
        <Field id={`${uid}-nom`} label="Nom" required>
          <input
            id={`${uid}-nom`}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={MAX.nom}
            aria-required="true"
            value={nom}
            onChange={e => onChange('nom', e.target.value)}
            placeholder="Jean Dupont"
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-base md:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-teal-500 transition-colors"
          />
        </Field>
        <Field id={`${uid}-email`} label="Email" required>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={MAX.email}
            aria-required="true"
            aria-invalid={emailInvalid}
            aria-describedby={emailInvalid ? `${uid}-email-hint` : undefined}
            value={email}
            onChange={e => onChange('email', e.target.value)}
            onBlur={() => setEmailTouched(true)}
            placeholder="jean@exemple.com"
            className={`w-full px-4 py-2.5 rounded-xl border text-base md:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-colors ${
              emailInvalid ? 'border-red-500 focus:border-red-600' : 'border-zinc-200 focus:border-teal-500'
            }`}
          />
          {emailInvalid && (
            <p id={`${uid}-email-hint`} className="text-xs text-red-700 mt-1.5">
              Adresse email invalide : il manque un « @ » ou un nom de domaine (exemple : jean@exemple.com).
            </p>
          )}
        </Field>
        <Field id={`${uid}-entreprise`} label="Entreprise">
          <input
            id={`${uid}-entreprise`}
            name="organization"
            type="text"
            autoComplete="organization"
            maxLength={MAX.entreprise}
            value={entreprise}
            onChange={e => onChange('entreprise', e.target.value)}
            placeholder="Acme SAS (optionnel)"
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-base md:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-teal-500 transition-colors"
          />
        </Field>
      </div>
    </div>
  )
}

// ─── Success ─────────────────────────────────────────────────────────────────

function Success() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  return (
    <div className="max-w-xl">
      <p className="text-xs font-mono text-teal-700 mb-4">Message envoyé</p>
      <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-semibold text-zinc-900 mb-3 focus:outline-none">Merci !</h2>
      <p className="text-zinc-500 leading-relaxed">
        J'ai bien reçu votre demande et reviendrai vers vous rapidement,
        généralement sous 48h.
      </p>
    </div>
  )
}

// ─── Shared components ───────────────────────────────────────────────────────

function Field({
  id, label, required, children,
}: {
  id: string; label: string; required?: boolean; children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-mono text-zinc-500 mb-1.5">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
    </div>
  )
}
