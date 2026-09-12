import { useEffect, useState } from 'react'
import CrudTable from '../components/CrudTable'
import MessageAlert from '../components/MessageAlert'
import mediaService from '../services/mediaService'
import generoService from '../services/generoService'
import directorService from '../services/directorService'
import productoraService from '../services/productoraService'
import tipoService from '../services/tipoService'

const initialForm = {
  serial: '',
  titulo: '',
  sinopsis: '',
  urlPelicula: '',
  imagenPortada: '',
  anioEstreno: '',
  generoId: '',
  directorId: '',
  productoraId: '',
  tipoId: '',
}

const MediaPage = () => {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState({ text: '', variant: 'success' })
  const [loading, setLoading] = useState(false)
  const [generos, setGeneros] = useState([])
  const [directores, setDirectores] = useState([])
  const [productoras, setProductoras] = useState([])
  const [tipos, setTipos] = useState([])

  const loadItems = async () => {
    try {
      const { data } = await mediaService.getAll()
      setItems(data)
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'No se pudieron cargar las medias.',
        variant: 'danger',
      })
    }
  }

  const loadCatalogs = async () => {
    try {
      const [generosResponse, directoresResponse, productorasResponse, tiposResponse] = await Promise.all([
        generoService.getAll(),
        directorService.getAll(),
        productoraService.getAll(),
        tipoService.getAll(),
      ])

      setGeneros(generosResponse.data.filter((item) => item.estado === 'Activo'))
      setDirectores(directoresResponse.data.filter((item) => item.estado === 'Activo'))
      setProductoras(productorasResponse.data.filter((item) => item.estado === 'Activo'))
      setTipos(tiposResponse.data)
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'No se pudieron cargar las relaciones.',
        variant: 'danger',
      })
    }
  }

  useEffect(() => {
    loadCatalogs()
    loadItems()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    const payload = {
      ...form,
      anioEstreno: Number(form.anioEstreno),
    }

    try {
      if (editingId) {
        await mediaService.update(editingId, payload)
        setMessage({ text: 'Media actualizada correctamente.', variant: 'success' })
      } else {
        await mediaService.create(payload)
        setMessage({ text: 'Media creada correctamente.', variant: 'success' })
      }

      setForm(initialForm)
      setEditingId(null)
      await loadItems()
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'No se pudo guardar la media.',
        variant: 'danger',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (row) => {
    setEditingId(row._id)
    setForm({
      serial: row.serial,
      titulo: row.titulo,
      sinopsis: row.sinopsis || '',
      urlPelicula: row.urlPelicula,
      imagenPortada: row.imagenPortada || '',
      anioEstreno: row.anioEstreno ?? '',
      generoId: row.generoId?._id || row.generoId || '',
      directorId: row.directorId?._id || row.directorId || '',
      productoraId: row.productoraId?._id || row.productoraId || '',
      tipoId: row.tipoId?._id || row.tipoId || '',
    })
    setMessage({ text: '', variant: 'success' })
  }

  const handleDelete = async (row) => {
    const confirmed = window.confirm(`¿Deseas eliminar la media "${row.titulo}"?`)
    if (!confirmed) return

    try {
      await mediaService.remove(row._id)
      setMessage({ text: 'Media eliminada correctamente.', variant: 'success' })
      await loadItems()
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'No se pudo eliminar la media.',
        variant: 'danger',
      })
    }
  }

  return (
    <div className="row g-4">
      <div className="col-lg-5">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <h2 className="h4 mb-3">{editingId ? 'Editar media' : 'Nueva media'}</h2>
            <MessageAlert message={message.text} variant={message.variant} />

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Serial</label>
                  <input
                    type="text"
                    className="form-control"
                    name="serial"
                    value={form.serial}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Sinopsis</label>
                  <textarea
                    className="form-control"
                    name="sinopsis"
                    rows="3"
                    value={form.sinopsis}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">URL de la película</label>
                  <input
                    type="url"
                    className="form-control"
                    name="urlPelicula"
                    value={form.urlPelicula}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Imagen de portada</label>
                  <input
                    type="url"
                    className="form-control"
                    name="imagenPortada"
                    value={form.imagenPortada}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Año de estreno</label>
                  <input
                    type="number"
                    className="form-control"
                    name="anioEstreno"
                    value={form.anioEstreno}
                    min="1888"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Género</label>
                  <select
                    className="form-select"
                    name="generoId"
                    value={form.generoId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione un género</option>
                    {generos.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Director</label>
                  <select
                    className="form-select"
                    name="directorId"
                    value={form.directorId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione un director</option>
                    {directores.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nombres}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Productora</label>
                  <select
                    className="form-select"
                    name="productoraId"
                    value={form.productoraId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione una productora</option>
                    {productoras.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Tipo</label>
                  <select
                    className="form-select"
                    name="tipoId"
                    value={form.tipoId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione un tipo</option>
                    {tipos.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="d-flex gap-2 mt-4">
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
            <h2 className="h4 mb-3">Listado de media</h2>
            <CrudTable
              columns={[
                { key: 'serial', label: 'Serial' },
                { key: 'titulo', label: 'Título' },
                { key: 'anioEstreno', label: 'Año' },
                {
                  key: 'generoId',
                  label: 'Género',
                  render: (value) => value?.nombre || '—',
                },
                {
                  key: 'directorId',
                  label: 'Director',
                  render: (value) => value?.nombres || '—',
                },
                {
                  key: 'productoraId',
                  label: 'Productora',
                  render: (value) => value?.nombre || '—',
                },
                {
                  key: 'tipoId',
                  label: 'Tipo',
                  render: (value) => value?.nombre || '—',
                },
              ]}
              rows={items}
              onEdit={handleEdit}
              onDelete={handleDelete}
              emptyMessage="No hay registros de media."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaPage
