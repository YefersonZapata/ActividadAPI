import api from './api'

export const directorService = {
  getAll: () => api.get('/directores'),
  create: (payload) => api.post('/directores', payload),
  update: (id, payload) => api.put(`/directores/${id}`, payload),
  remove: (id) => api.delete(`/directores/${id}`),
}

export default directorService
