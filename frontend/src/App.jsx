import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import DirectorPage from './pages/DirectorPage'
import GeneroPage from './pages/GeneroPage'
import MediaPage from './pages/MediaPage'
import ProductoraPage from './pages/ProductoraPage'
import TipoPage from './pages/TipoPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/generos" replace />} />
          <Route path="/generos" element={<GeneroPage />} />
          <Route path="/directores" element={<DirectorPage />} />
          <Route path="/productoras" element={<ProductoraPage />} />
          <Route path="/tipos" element={<TipoPage />} />
          <Route path="/medias" element={<MediaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
