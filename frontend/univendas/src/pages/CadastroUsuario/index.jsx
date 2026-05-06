// pages/CadastroUsuario/index.jsx
import { useState } from 'react'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import { FormularioCadastroUsuario } from '../../componentes/FormularioCadastroUsuario/index.jsx'
import { Banner } from '../../componentes/Banner/index.jsx'
import api from '../../services/api.js'
import { useNavigate, useLocation } from 'react-router-dom'
import { FundoDecorado } from '../../componentes/FundoDecorado/index.jsx'
import { ENDPOINTS } from '../../services/endpoints.js'
import { VerificacaoEmail } from '../../componentes/VerificacaoEmail/index.jsx'

export const CadastroUsuario = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const usuarioParaEditar = location.state?.usuarioParaEditar

  // etapa: 'form' | 'verificacao'
  const [etapa, setEtapa] = useState('form')
  const [dadosPendentes, setDadosPendentes] = useState(null)
  const [enviando, setEnviando] = useState(false)

  const iniciarCadastro = async (dadosFormulario) => {
    // Se for edição, fluxo normal sem verificação
    if (usuarioParaEditar) {
      await salvarEdicao(dadosFormulario)
      return
    }
    try {
      setEnviando(true)
      await api.post(ENDPOINTS.VERIFICATION_REGISTRATION_SEND, {
        email: dadosFormulario.email
      })
      setDadosPendentes(dadosFormulario)
      setEtapa('verificacao')
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao enviar código.')
    } finally {
      setEnviando(false)
    }
  }

  const confirmarCodigo = async (codigo) => {
    try {
      setEnviando(true)
      const formData = new FormData()
      formData.append('name', dadosPendentes.nome)
      formData.append('email', dadosPendentes.email)
      formData.append('password', dadosPendentes.senha)
      formData.append('phoneNumber', dadosPendentes.numero)
      formData.append('city', dadosPendentes.cidade)
      formData.append('code', codigo)
      if (dadosPendentes.imagem instanceof File) {
        formData.append('image', dadosPendentes.imagem)
      }
      await api.post(ENDPOINTS.USUARIO, formData)
      alert('Conta criada com sucesso! Faça login.')
      navigate('/auth/login')
    } catch (error) {
      const msg = error.response?.data?.fields?.[0]?.error
            || error.response?.data?.message
            || 'Código inválido ou expirado.'
      alert(msg)
    } finally {
      setEnviando(false)
    }
  }

  const salvarEdicao = async (dadosFormulario) => {
    try {
      const formData = new FormData()
      formData.append('name', dadosFormulario.nome)
      formData.append('email', dadosFormulario.email)
      formData.append('password', dadosFormulario.senha)
      formData.append('phoneNumber', dadosFormulario.numero)
      formData.append('city', dadosFormulario.cidade)
      if (dadosFormulario.imagem instanceof File) {
        formData.append('image', dadosFormulario.imagem)
      }
      await api.put(ENDPOINTS.USUARIO_ID(usuarioParaEditar.id), formData)
      alert('Dados atualizados!')
      navigate(`/usuario/${usuarioParaEditar.id}`)
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao salvar.')
    }
  }

  return (
    <>
      <FundoDecorado>
        <section className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid overflow-hidden rounded-[32px] border border-white/60 bg-white/55 shadow-[0_32px_90px_-34px_rgba(62,16,68,0.45)] backdrop-blur-xl lg:grid-cols-[1.08fr_0.92fr]">
            <Banner />
            <div className="p-4 sm:p-6 lg:p-8">
              {etapa === 'form' ? (
                <FormularioCadastroUsuario
                  aoCadastrarUsuario={iniciarCadastro}
                  href={usuarioParaEditar ? `/usuario/${usuarioParaEditar.id}` : '/auth/login'}
                  usuarioEdicao={usuarioParaEditar}
                  enviando={enviando}
                />
              ) : (
                <VerificacaoEmail
                  email={dadosPendentes?.email}
                  aoConfirmar={confirmarCodigo}
                  aoReenviar={() => iniciarCadastro(dadosPendentes)}
                  aoVoltar={() => setEtapa('form')}
                  enviando={enviando}
                />
              )}
            </div>
          </div>
        </section>
      </FundoDecorado>
      <BarraRodape />
    </>
  )
}