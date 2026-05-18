import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { RotaProtegida } from './componentes/RotaProtegida/index.jsx'
import { Login } from './pages/Login/index.jsx'
import { CadastroProduto } from './pages/CadastroProduto/index.jsx'
import { CadastroUsuario } from './pages/CadastroUsuario/index.jsx'
import { Produtos } from './pages/Produtos/index.jsx'
import { Produto } from './pages/Produto/index.jsx'
import { Usuarios } from './pages/Usuarios/index.jsx'
import { Usuario } from './pages/Usuario/index.jsx'
import { EsqueciSenha } from './pages/EsqueciSenha/index.jsx'
import { Dashboard } from './pages/Dashboard/index.jsx'
import { ProdutosVendidos } from './pages/ProdutosVendidos/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Rotas públicas */}
          <Route path='/auth'>
            <Route path="login" element={<Login />} />
            <Route path="cadastro-usuario" element={<CadastroUsuario />} />
            <Route path="esqueci-senha" element={<EsqueciSenha />} />
          </Route>

          {/* Rotas protegidas */}
          <Route element={<RotaProtegida />}>
            <Route path='produtos' element={<Produtos />} />
            <Route path='produto/:id' element={<Produto />} />
            <Route path='usuarios' element={<Usuarios />} />
            <Route path='usuario/:id' element={<Usuario />} />
            <Route path='cadastro-produto' element={<CadastroProduto />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='produtos-vendidos' element={<ProdutosVendidos />} />
          </Route>

          {/* Raiz redireciona para produtos (RotaProtegida trata autenticação) */}
          <Route path='/' element={<Navigate to="/produtos" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
