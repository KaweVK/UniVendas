import { useState } from 'react'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import { FormularioCadastroUsuario } from '../../componentes/FormularioCadastroUsuario/index.jsx'
import { Banner } from '../../componentes/Banner/index.jsx'
import { useNavigate, useLocation } from 'react-router-dom'
import { FundoDecorado } from '../../componentes/FundoDecorado/index.jsx'
import { VerificacaoEmail } from '../../componentes/VerificacaoEmail/index.jsx'
import { criarUsuario, atualizarUsuario } from '../../services/usuariosService.js'
import { enviarCodigoCadastro } from '../../services/verificacaoService.js'
import { extrairErro } from '../../utils/extrairErro.js'

export const CadastroUsuario = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const usuarioParaEditar = location.state?.usuarioParaEditar

  const [etapa, setEtapa] = useState('form')
  const [dadosPendentes, setDadosPendentes] = useState(null)
  const [enviando, setEnviando] = useState(false)

  const iniciarCadastro = async (dadosFormulario) => {
    if (usuarioParaEditar) {
      await salvarEdicao(dadosFormulario)
      return
    }
    try {
      setEnviando(true)
      await enviarCodigoCadastro(dadosFormulario.email)
      setDadosPendentes(dadosFormulario)
      setEtapa('verificacao')
    } catch (error) {
      alert(extrairErro(error, 'Erro ao enviar código.'))
    } finally {
      setEnviando(false)
    }
  }

  const confirmarCodigo = async (codigo) => {
    try {
      setEnviando(true)
      await criarUsuario(dadosPendentes, codigo)
      alert('Conta criada com sucesso! Faça login.')
      navigate('/auth/login')
    } catch (error) {
      alert(extrairErro(error, 'Código inválido ou expirado.'))
    } finally {
      setEnviando(false)
    }
  }

  const salvarEdicao = async (dadosFormulario) => {
    try {
      await atualizarUsuario(usuarioParaEditar.id, dadosFormulario)
      alert('Dados atualizados!')
      navigate(`/usuario/${usuarioParaEditar.id}`)
    } catch (error) {
      alert(extrairErro(error, 'Erro ao salvar.'))
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
