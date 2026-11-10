import { useEffect, useId, useRef, useState, type ReactNode, type SubmitEvent } from 'react'

const CONTACT_EMAIL = 'maxime@mdigitalstudio.fr'

// Limites alignées sur la validation de api/contact.ts
const MAX = { problem: 2000, name: 100, email: 200, phone: 30, company: 100 }
const SEND_TIMEOUT_MS = 15_000

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
// Même règle que l'API : chiffres, espaces, points, tirets, parenthèses, « + » en tête ; 8 à 15 chiffres
const isValidPhone = (v: string) => {
  const digits = v.replace(/\D/g, '').length
  return /^\+?[\d\s().-]+$/.test(v.trim()) && digits >= 8 && digits <= 15
}

// ─── Types ───────────────────────────────────────────────────────────────────

type Format = 'appel' | 'visite'
type SendError = 'rate' | 'timeout' | 'generic'

type FormData = {
  problem: string
  format: Format | ''
  name: string
  email: string
  phone: string
  company: string
}

type Field = keyof FormData

const initial: FormData = {
  problem: '', format: '', name: '', email: '', phone: '', company: '',
}

// Ordre d'affichage : le focus va sur la première erreur dans cet ordre
const FIELD_ORDER: Field[] = ['problem', 'format', 'name', 'email', 'phone']

function validate(d: FormData): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {}
  if (!d.problem.trim()) errors.problem = 'Décrivez en quelques mots ce qui coince.'
  if (!d.format) errors.format = 'Choisissez un appel ou une visite.'
  if (!d.name.trim()) errors.name = 'Indiquez votre nom.'
  if (!d.email.trim()) errors.email = 'Indiquez votre adresse e-mail.'
  else if (!isValidEmail(d.email)) {
    errors.email = 'Adresse e-mail invalide : il manque un « @ » ou un nom de domaine (exemple : jean@exemple.com).'
  }
  if (d.format === 'appel' && !d.phone.trim()) {
    errors.phone = 'Indiquez un numéro pour que je puisse vous appeler.'
  } else if (d.phone.trim() && !isValidPhone(d.phone)) {
    errors.phone = 'Numéro invalide (exemple : 06 12 34 56 78).'
  }
  return errors
}

// ─── Formulaire ──────────────────────────────────────────────────────────────

export default function ContactForm() {
  const uid = useId()
  const [data, setData] = useState<FormData>(initial)
  const [hp, setHp] = useState('')
  // Les erreurs ne s'affichent qu'après une première tentative d'envoi, puis se mettent à jour à la frappe
  const [attempted, setAttempted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<SendError | null>(null)

  const set = <K extends Field>(key: K, value: FormData[K]) =>
    setData(prev => ({ ...prev, [key]: value }))

  const errors = attempted ? validate(data) : {}
  const id = (f: Field) => `${uid}-${f}`
  const errId = (f: Field) => `${uid}-${f}-error`

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAttempted(true)
    const found = validate(data)
    const first = FIELD_ORDER.find(f => found[f])
    if (first) {
      // Le focus sur le premier champ en erreur fait lire son libellé et son message
      const target = first === 'format'
        ? document.querySelector<HTMLInputElement>(`input[name="${id('format')}"]`)
        : document.getElementById(id(first))
      target?.focus()
      return
    }

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

  const telRequired = data.format === 'appel'

  return (
    <form noValidate onSubmit={handleSubmit} className="max-w-xl">
      {/* Honeypot — invisible pour les humains, les bots le remplissent */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
        <input type="text" name="website" value={hp} onChange={e => setHp(e.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-8">
        <FieldBlock id={id('problem')} label="Qu'est-ce qui coince aujourd'hui ?" required error={errors.problem} errorId={errId('problem')}>
          <textarea
            id={id('problem')}
            name="problem"
            value={data.problem}
            onChange={e => set('problem', e.target.value)}
            rows={5}
            maxLength={MAX.problem}
            aria-required="true"
            aria-invalid={!!errors.problem}
            aria-describedby={errors.problem ? errId('problem') : undefined}
            placeholder="Planning sur Excel, bons papier ressaisis le soir…"
            className={inputClass(!!errors.problem, 'py-3 resize-none')}
          />
        </FieldBlock>

        <div>
          <p id={`${id('format')}-label`} className={labelClass}>
            Vous préférez<span aria-hidden="true"> *</span>
          </p>
          <div
            role="radiogroup"
            aria-labelledby={`${id('format')}-label`}
            aria-required="true"
            aria-invalid={!!errors.format}
            aria-describedby={errors.format ? errId('format') : undefined}
            className="grid gap-3 sm:grid-cols-2"
          >
            <FormatOption name={id('format')} value="appel" label="Un appel" desc="Au téléphone, 30 min" checked={data.format === 'appel'} onChange={v => set('format', v)} />
            <FormatOption name={id('format')} value="visite" label="Une visite" desc="Je viens sur place, 30 min" checked={data.format === 'visite'} onChange={v => set('format', v)} />
          </div>
          <ErrorText id={errId('format')} message={errors.format} />
        </div>

        <div className="flex flex-col gap-4">
          <FieldBlock id={id('name')} label="Nom" required error={errors.name} errorId={errId('name')}>
            <input
              id={id('name')}
              name="name"
              type="text"
              autoComplete="name"
              maxLength={MAX.name}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? errId('name') : undefined}
              value={data.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Jean Dupont"
              className={inputClass(!!errors.name)}
            />
          </FieldBlock>
          <FieldBlock id={id('email')} label="E-mail" required error={errors.email} errorId={errId('email')}>
            <input
              id={id('email')}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              maxLength={MAX.email}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? errId('email') : undefined}
              value={data.email}
              onChange={e => set('email', e.target.value)}
              placeholder="jean@exemple.com"
              className={inputClass(!!errors.email)}
            />
          </FieldBlock>
          <FieldBlock
            id={id('phone')}
            label={telRequired ? 'Téléphone' : 'Téléphone (facultatif)'}
            required={telRequired}
            error={errors.phone}
            errorId={errId('phone')}
          >
            <input
              id={id('phone')}
              name="tel"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={MAX.phone}
              aria-required={telRequired}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? errId('phone') : undefined}
              value={data.phone}
              onChange={e => set('phone', e.target.value)}
              placeholder="06 12 34 56 78"
              className={inputClass(!!errors.phone)}
            />
          </FieldBlock>
          <FieldBlock id={id('company')} label="Entreprise (facultatif)">
            <input
              id={id('company')}
              name="organization"
              type="text"
              autoComplete="organization"
              maxLength={MAX.company}
              value={data.company}
              onChange={e => set('company', e.target.value)}
              placeholder="Dupont Services"
              className={inputClass(false)}
            />
          </FieldBlock>
        </div>
      </div>

      <div className="mt-10">
        <button
          type="submit"
          disabled={submitting}
          className="min-h-11 px-5 py-3 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 active:translate-y-px transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
        </button>
      </div>

      {error && <SendErrorMessage kind={error} />}
    </form>
  )
}

// ─── Styles partagés ─────────────────────────────────────────────────────────

const labelClass = 'block text-xs font-mono text-zinc-500 mb-1.5'

// Focus : bordure + ring d'1 px = 2 px en teal-700 (5,5:1) ; le teal-500 seul n'atteint que ~2,4:1
const inputClass = (invalid: boolean, extra = 'py-2.5') =>
  `w-full min-h-11 px-4 ${extra} rounded-xl border text-base md:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 transition-colors ${
    invalid
      ? 'border-red-500 focus:border-red-600 focus:ring-red-600'
      : 'border-zinc-200 focus:border-teal-700 focus:ring-teal-700'
  }`

// ─── Choix appel / visite ────────────────────────────────────────────────────

function FormatOption({
  name, value, label, desc, checked, onChange,
}: {
  name: string; value: Format; label: string; desc: string; checked: boolean
  onChange: (v: Format) => void
}) {
  // Vrais boutons radio : flèches, espace et lecteurs d'écran fonctionnent sans code
  return (
    <label
      className={`flex min-h-11 cursor-pointer items-start gap-3 px-4 py-3.5 rounded-xl border transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-zinc-900 ${
        checked ? 'border-teal-500 bg-teal-50/50' : 'border-zinc-200 hover:border-zinc-300'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span className="flex-auto">
        <span className={`block text-sm font-medium ${checked ? 'text-zinc-900' : 'text-zinc-700'}`}>{label}</span>
        <span className="mt-0.5 block text-xs text-zinc-500">{desc}</span>
      </span>
      {/* Repère non colorimétrique : le rond plein indique le choix */}
      <span
        aria-hidden="true"
        className={`mt-0.5 flex size-4 flex-none items-center justify-center rounded-full border ${
          checked ? 'border-zinc-900' : 'border-zinc-300'
        }`}
      >
        {checked && <span className="size-2 rounded-full bg-zinc-900" />}
      </span>
    </label>
  )
}

// ─── Champ et erreur ─────────────────────────────────────────────────────────

function FieldBlock({
  id, label, required, error, errorId, children,
}: {
  id: string; label: string; required?: boolean; error?: string; errorId?: string; children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {errorId && <ErrorText id={errorId} message={error} />}
    </div>
  )
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return <p id={id} className="text-xs text-red-700 mt-1.5">{message}</p>
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

// ─── Confirmation ────────────────────────────────────────────────────────────

function Success() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  return (
    <div className="max-w-xl">
      <p className="text-xs font-mono text-teal-700 mb-4">Demande envoyée</p>
      <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-semibold text-zinc-900 mb-3 focus:outline-none">Merci !</h2>
      <p className="text-zinc-500 leading-relaxed">
        J'ai bien reçu votre demande. Je vous rappelle sous 48 h ouvrées pour fixer le rendez-vous.
      </p>
    </div>
  )
}
