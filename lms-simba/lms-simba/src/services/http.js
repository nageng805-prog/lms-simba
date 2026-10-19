// Lapisan transport. Fase berikutnya: ganti isi `request` dengan fetch/axios
// ke API Laravel (mis. import.meta.env.VITE_API_URL) tanpa mengubah service lain.
export const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))
export const clone = (v) => JSON.parse(JSON.stringify(v))

export async function request(resolver) {
  await delay()
  return clone(await resolver())
}
