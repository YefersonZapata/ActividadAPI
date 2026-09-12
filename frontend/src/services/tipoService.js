import api from './api'

export const tipoService = {
  getAll: () => api.get('/tipos'),
  create: (payload) => api.post('/tipos', payload),
  update: (id, payload) => api.put(`/tipos/${id}`, payload),
  remove: (id) => api.delete(`/tipos/${id}`),
}

export default tipoService
