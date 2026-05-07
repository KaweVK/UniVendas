import { useState } from 'react'
import { Banner } from '../../componentes/Banner/index.jsx'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import { FundoDecorado } from '../../componentes/FundoDecorado/index.jsx'
import { Botao } from '../../componentes/Botao/index.jsx'
import { CampoInput } from '../../componentes/CampoInput/index.jsx'
import { useNavigate, Link } from 'react-router-dom'
import { enviarCodigoReset, confirmarReset } from '../../services/verificacaoService.js'
import { extrairErro } from '../../utils/extrairErro.js'

const labelClassName = 'mb-2 block text-sm font-medium text-slate-700'
const inputClassName =
    'w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#8a4d94] focus:ring-4 focus:ring-fuchsia-100'

export const EsqueciSenha = () => {
    const navigate = useNavigate()

    const [etapa, setEtapa] = useState('email')
    const [email, setEmail] = useState('')
    const [codigo, setCodigo] = useState('')
    const [novaSenha, setNovaSenha] = useState('')
    const [enviando, setEnviando] = useState(false)

    const enviarCodigo = async (e) => {
        e.preventDefault()
        try {
            setEnviando(true)
            await enviarCodigoReset(email)
            setEtapa('codigo')
        } catch (error) {
            alert(extrairErro(error, 'Email não encontrado.'))
        } finally {
            setEnviando(false)
        }
    }

    const redefinirSenha = async (e) => {
        e.preventDefault()
        try {
            setEnviando(true)
            await confirmarReset({ email, codigo, novaSenha })
            alert('Senha redefinida! Faça login.')
            navigate('/auth/login')
        } catch (error) {
            alert(extrairErro(error, 'Código inválido ou expirado.'))
        } finally {
            setEnviando(false)
        }
    }

    return (
        <>
            <FundoDecorado>
                <section className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
                    <div className="grid overflow-hidden rounded-[32px] border border-white/60 bg-white/55 shadow-[0_32px_90px_-34px_rgba(62,16,68,0.45)] backdrop-blur-xl lg:grid-cols-[1.08fr_0.92fr]">
                        <Banner />
                        <div className="p-4 sm:p-6 lg:p-8">
                            <form
                                onSubmit={etapa === 'email' ? enviarCodigo : redefinirSenha}
                                className="flex h-full flex-col justify-center rounded-[28px] bg-white/80 p-6 ring-1 ring-slate-200/80 backdrop-blur sm:p-8 lg:min-h-[560px] lg:p-10"
                            >
                                <div className="mb-8">
                                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#6b2e74]/70">
                                        Recuperação
                                    </p>
                                    <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                                        {etapa === 'email' ? 'Esqueci minha senha' : 'Nova senha'}
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        {etapa === 'email'
                                            ? 'Informe seu email e enviaremos um código de redefinição.'
                                            : `Código enviado para ${email}. Digite-o abaixo com sua nova senha.`}
                                    </p>
                                </div>

                                <div className="space-y-5">
                                    {etapa === 'email' ? (
                                        <CampoInput id="email" type="email" label="Email" labelClassName={labelClassName}
                                            obrigatorio placeholder="seu@dcx.ufpb.br" valor={email}
                                            aoAlterado={setEmail} className={inputClassName} />
                                    ) : (
                                        <>
                                            <div>
                                                <label className={labelClassName}>Código de verificação</label>
                                                <input type="text" inputMode="numeric" maxLength={6}
                                                    value={codigo} onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
                                                    placeholder="000000" required
                                                    className={`${inputClassName} text-center text-2xl tracking-[0.5em] font-bold`}
                                                />
                                            </div>
                                            <CampoInput id="novaSenha" type="password" label="Nova senha"
                                                labelClassName={labelClassName} obrigatorio placeholder="Mínimo 4 caracteres"
                                                valor={novaSenha} aoAlterado={setNovaSenha} className={inputClassName} />
                                        </>
                                    )}
                                </div>

                                <div className="mt-8 space-y-4">
                                    <Botao type="submit" className="botao-padrao" disabled={enviando}>
                                        {enviando ? 'Aguarde...' : etapa === 'email' ? 'Enviar código' : 'Redefinir senha'}
                                    </Botao>
                                    <p className="text-center text-sm text-slate-500">
                                        <Link
                                            to={'/auth/login'}
                                            className="font-semibold text-[#5a1f62] underline-offset-4 transition hover:underline"
                                        >
                                            Voltar
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </FundoDecorado>
            <BarraRodape />
        </>
    )
}
