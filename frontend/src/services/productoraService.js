import api from './api'

export const productoraService = {
  getAll: () => api.get('/productoras'),
  create: (payload) => api.post('/productoras', payload),
  update: (id, payload) => api.put(`/productoras/${id}`, payload),
  remove: (id) => api.delete(`/productoras/${id}`),
}

export default productoraService
