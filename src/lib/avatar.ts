// Déposer la photo dans src/assets/ sous le nom avatar.jpg (ou .jpeg / .png / .webp) :
// elle est utilisée dans le hero et dans l'en-tête. Sans fichier, `avatar` est undefined.
const found = import.meta.glob<{ default: ImageMetadata }>('../assets/avatar.{jpg,jpeg,png,webp}', {
  eager: true,
})

export const avatar: ImageMetadata | undefined = Object.values(found)[0]?.default
