const CrudTable = ({ columns, rows, onEdit, onDelete, emptyMessage = 'Sin registros.' }) => {
  if (!rows || rows.length === 0) {
    return (
      <div className="alert alert-secondary mb-0" role="alert">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle shadow-sm rounded overflow-hidden">
        <thead className="table-dark">
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.label}
              </th>
            ))}
            {(onEdit || onDelete) && <th scope="col" className="text-center">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id || row.id}>
              {columns.map((column) => (
                <td key={`${row._id || row.id}-${column.key}`}>
                  {column.render ? column.render(row[column.key], row) : row[column.key] ?? '—'}
                </td>
              ))}

              {(onEdit || onDelete) && (
                <td className="text-center">
                  {onEdit && (
                    <button
                      type="button"
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => onEdit(row)}
                    >
                      Editar
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(row)}
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CrudTable
