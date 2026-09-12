import api from './api'

export const mediaService = {
  getAll: () => api.get('/medias'),
  getById: (id) => api.get(`/medias/${id}`),
  create: (payload) => api.post('/medias', payload),
  update: (id, payload) => api.put(`/medias/${id}`, payload),
  remove: (id) => api.delete(`/medias/${id}`),
}

export default mediaService
