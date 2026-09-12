import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { label: 'Géneros', to: '/generos' },
  { label: 'Directores', to: '/directores' },
  { label: 'Productoras', to: '/productoras' },
  { label: 'Tipos', to: '/tipos' },
  { label: 'Media', to: '/medias' },
]

const Layout = () => {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">Media Admin</span>
          <div className="navbar-nav ms-auto d-flex flex-row gap-3 flex-wrap">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active fw-semibold' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
