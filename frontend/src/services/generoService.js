import api from './api'

export const generoService = {
  getAll: () => api.get('/generos'),
  create: (payload) => api.post('/generos', payload),
  update: (id, payload) => api.put(`/generos/${id}`, payload),
  remove: (id) => api.delete(`/generos/${id}`),
}

export default generoService
