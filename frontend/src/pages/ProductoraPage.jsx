import { useEffect, useState } from 'react'
import CrudTable from '../components/CrudTable'
import MessageAlert from '../components/MessageAlert'
import productoraService from '../services/productoraService'

const initialForm = {
  nombre: '',
  estado: 'Activo',
  slogan: '',
  descripcion: '',
}

const ProductoraPage = () => {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState({ text: '', variant: 'success' })
  const [loading, setLoading] = useState(false)

  const loadItems = async () => {
    try {
      const { data } = await productoraService.getAll()
      setItems(data)
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'No se pudieron cargar las productoras.',
        variant: 'danger',
      })
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      if (editingId) {
        await productoraService.update(editingId, form)
        setMessage({ text: 'Productora actualizada correctamente.', variant: 'success' })
      } else {
        await productoraService.create(form)
        setMessage({ text: 'Productora creada correctamente.', variant: 'success' })
      }

      setForm(initialForm)
      setEditingId(null)
      await loadItems()
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'No se pudo guardar la productora.',
        variant: 'danger',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (row) => {
    setEditingId(row._id)
    setForm({
      nombre: row.nombre,
      estado: row.estado,
      slogan: row.slogan || '',
      descripcion: row.descripcion || '',
    })
    setMessage({ text: '', variant: 'success' })
  }

  const handleDelete = async (row) => {
    const confirmed = window.confirm(`¿Deseas eliminar la productora "${row.nombre}"?`)
    if (!confirmed) return

    try {
      await productoraService.remove(row._id)
      setMessage({ text: 'Productora eliminada correctamente.', variant: 'success' })
      await loadItems()
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'No se pudo eliminar la productora.',
        variant: 'danger',
      })
    }
  }

  return (
    <div className="row g-4">
      <div className="col-lg-5">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <h2 className="h4 mb-3">{editingId ? 'Editar productora' : 'Nueva productora'}</h2>
            <MessageAlert message={message.text} variant={message.variant} />

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Slogan</label>
                <input
                  type="text"
                  className="form-control"
                  name="slogan"
                  value={form.slogan}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  name="descripcion"
                  rows="4"
                  value={form.descripcion}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Guardar'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setEditingId(null)
                      setForm(initialForm)
                      setMessage({ text: '', variant: 'success' })
                    }}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-lg-7">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h2 className="h4 mb-3">Listado de productoras</h2>
            <CrudTable
              columns={[
                { key: 'nombre', label: 'Nombre' },
                { key: 'estado', label: 'Estado' },
                { key: 'slogan', label: 'Slogan' },
                { key: 'descripcion', label: 'Descripción' },
              ]}
              rows={items}
              onEdit={handleEdit}
              onDelete={handleDelete}
              emptyMessage="No hay productoras registradas."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductoraPage
