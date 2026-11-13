// ─── Tarifs affichés ───
// Seul endroit où vivent les montants : changer un prix, c'est changer une ligne ici.
// En euros, sans TVA (franchise en base, art. 293 B du CGI).

export const PRICES = {
  etude: 1200,
  automatisation: 1500,
  application: 8000,
  maintenanceAutomatisation: 60,
  maintenanceApplication: 150,
  hebergement: 40,
} as const

export const VAT_NOTICE = 'TVA non applicable, art. 293 B du CGI'

// « 1 200 € », avec l'espace insécable fine du format français
const formatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

export const eur = (amount: number) => formatter.format(amount)
