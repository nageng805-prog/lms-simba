import { request } from './http'

// Service generik berbasis array mock. Kontrak: list(), get(id).
export function createCrudService(data) {
  return {
    list: () => request(() => data),
    get: (id) => request(() => data.find((d) => d.id === Number(id)) ?? null),
  }
}
