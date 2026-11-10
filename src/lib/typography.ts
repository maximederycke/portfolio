// ─── Échelle typographique des pages ───
// Une seule échelle pour toutes les pages : DM Sans pour les titres et le texte,
// DM Mono réservé aux métadonnées (dates, compteurs, statuts).

export const h1 = 'text-4xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-5xl'

export const lede = 'mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-zinc-600'

export const h2 = 'text-2xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-3xl'

export const h3 = 'text-xl font-semibold text-zinc-900'

// Texte courant : mesure limitée à ~75 caractères
export const body = 'max-w-2xl leading-relaxed text-pretty text-zinc-600'

// Lien dans le texte courant : souligné en permanence, le soulignement fonce au survol
export const inlineLink =
  'text-zinc-900 underline decoration-zinc-900/30 underline-offset-4 transition-colors hover:decoration-zinc-900'

// Puce décorative des listes, ignorée par les lecteurs d'écran (aria-hidden posé dans le balisage)
export const bullet = 'mt-[0.7em] h-px w-3 shrink-0 bg-zinc-300'
