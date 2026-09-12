import { useEffect, useState } from 'react'
import CrudTable from '../components/CrudTable'
import MessageAlert from '../components/MessageAlert'
import tipoService from '../services/tipoService'

const initialForm = {
  nombre: '',
  descripcion: '',
}

const TipoPage = () => {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState({ text: '', variant: 'success' })
  const [loading, setLoading] = useState(false)

  const loadItems = async () => {
    try {
      const { data } = await tipoService.getAll()
      setItems(data)
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'No se pudieron cargar los tipos.',
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
        await tipoService.update(editingId, form)
        setMessage({ text: 'Tipo actualizado correctamente.', variant: 'success' })
      } else {
        await tipoService.create(form)
        setMessage({ text: 'Tipo creado correctamente.', variant: 'success' })
      }

      setForm(initialForm)
      setEditingId(null)
      await loadItems()
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'No se pudo guardar el tipo.',
        variant: 'danger',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (row) => {
    setEditingId(row._id)
    setForm({ nombre: row.nombre, descripcion: row.descripcion || '' })
    setMessage({ text: '', variant: 'success' })
  }

  const handleDelete = async (row) => {
    const confirmed = window.confirm(`¿Deseas eliminar el tipo "${row.nombre}"?`)
    if (!confirmed) return

    try {
      await tipoService.remove(row._id)
      setMessage({ text: 'Tipo eliminado correctamente.', variant: 'success' })
      await loadItems()
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'No se pudo eliminar el tipo.',
        variant: 'danger',
      })
    }
  }

  return (
    <div className="row g-4">
      <div className="col-lg-4">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <h2 className="h4 mb-3">{editingId ? 'Editar tipo' : 'Nuevo tipo'}</h2>
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

      <div className="col-lg-8">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h2 className="h4 mb-3">Listado de tipos</h2>
            <CrudTable
              columns={[
                { key: 'nombre', label: 'Nombre' },
                { key: 'descripcion', label: 'Descripción' },
              ]}
              rows={items}
              onEdit={handleEdit}
              onDelete={handleDelete}
              emptyMessage="No hay tipos registrados."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TipoPage
