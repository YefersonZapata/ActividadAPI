import { useEffect, useState } from 'react'
import CrudTable from '../components/CrudTable'
import MessageAlert from '../components/MessageAlert'
import directorService from '../services/directorService'

const initialForm = {
  nombres: '',
  estado: 'Activo',
}

const DirectorPage = () => {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState({ text: '', variant: 'success' })
  const [loading, setLoading] = useState(false)

  const loadItems = async () => {
    try {
      const { data } = await directorService.getAll()
      setItems(data)
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'No se pudieron cargar los directores.',
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
        await directorService.update(editingId, form)
        setMessage({ text: 'Director actualizado correctamente.', variant: 'success' })
      } else {
        await directorService.create(form)
        setMessage({ text: 'Director creado correctamente.', variant: 'success' })
      }

      setForm(initialForm)
      setEditingId(null)
      await loadItems()
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'No se pudo guardar el director.',
        variant: 'danger',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (row) => {
    setEditingId(row._id)
    setForm({ nombres: row.nombres, estado: row.estado })
    setMessage({ text: '', variant: 'success' })
  }

  const handleDelete = async (row) => {
    const confirmed = window.confirm(`¿Deseas eliminar al director "${row.nombres}"?`)
    if (!confirmed) return

    try {
      await directorService.remove(row._id)
      setMessage({ text: 'Director eliminado correctamente.', variant: 'success' })
      await loadItems()
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'No se pudo eliminar el director.',
        variant: 'danger',
      })
    }
  }

  return (
    <div className="row g-4">
      <div className="col-lg-4">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <h2 className="h4 mb-3">{editingId ? 'Editar director' : 'Nuevo director'}</h2>
            <MessageAlert message={message.text} variant={message.variant} />

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombres</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombres"
                  value={form.nombres}
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
            <h2 className="h4 mb-3">Listado de directores</h2>
            <CrudTable
              columns={[
                { key: 'nombres', label: 'Nombres' },
                { key: 'estado', label: 'Estado' },
              ]}
              rows={items}
              onEdit={handleEdit}
              onDelete={handleDelete}
              emptyMessage="No hay directores registrados."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DirectorPage
