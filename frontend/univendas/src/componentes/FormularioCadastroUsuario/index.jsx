/* eslint-disable react-hooks/set-state-in-effect */
import { CampoInput } from '../CampoInput'
import { Botao } from '../Botao'
import { PreviewImagem } from '../PreviewImagem'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './FormularioCadastroUsuario.css'

const labelClassName = 'mb-2 block text-sm font-medium text-slate-700'
const inputClassName =
    'w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#8a4d94] focus:ring-4 focus:ring-fuchsia-100'

export const FormularioCadastroUsuario = (props) => {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [numero, setNumero] = useState('')
    const [cidade, setCidade] = useState('')
    const [imagem, setImagem] = useState(null)
    const [previewImagem, setPreviewImagem] = useState(null)

    useEffect(() => {
        if (props.usuarioEdicao) {
            setNome(props.usuarioEdicao.name || '');
            setNumero(props.usuarioEdicao.phoneNumber || '');
            setCidade(props.usuarioEdicao.city || '');
            setPreviewImagem(props.usuarioEdicao.image || null);
        }
    }, [props.usuarioEdicao]);

    const salvarImage = (image) => {
        setImagem(image)
        const preview = URL.createObjectURL(image)
        setPreviewImagem(preview)
    }

    const aoSalvar = (evento) => {
        evento.preventDefault()
        props.aoCadastrarUsuario({
            nome,
            email,
            senha,
            numero,
            cidade,
            imagem
        })

        if (!props.usuarioEdicao) {
            setNome('')
            setEmail('')
            setSenha('')
            setNumero('')
            setCidade('')
            setImagem(null)
            setPreviewImagem(null)
        }
    }

    return (
        <section className='h-full'>
            <form
                onSubmit={aoSalvar}
                className="flex h-full flex-col justify-center rounded-[28px] bg-white/80 p-6 shadow-[0_24px_70px_-50px_rgba(68,18,74,0.45)] ring-1 ring-slate-200/80 backdrop-blur sm:p-8 lg:min-h-[560px] lg:p-10"
            >
                <div className="mb-8">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#6b2e74]/70">
                        {props.usuarioEdicao ? 'Editar conta' : 'Criar conta'}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-[2rem]">
                        {props.usuarioEdicao ? 'Edite sua conta' : 'Cadastre-se'}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        {props.usuarioEdicao ? 'Preencha os campos abaixo para editar sua conta.' : 'Preencha os campos abaixo para criar sua conta.'}
                    </p>
                </div>

                <div className="space-y-5">
                    <CampoInput
                        id="nome"
                        name="nome"
                        type="text"
                        label="Nome Completo"
                        labelClassName={labelClassName}
                        autoComplete="nome"
                        obrigatorio={true}
                        placeholder="Digite o seu nome completo"
                        valor={nome}
                        aoAlterado={setNome}
                        className={inputClassName}
                    />
                    
                    {!props.usuarioEdicao ?
                    <CampoInput
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        labelClassName={labelClassName}
                        autoComplete="email"
                        obrigatorio={true}
                        placeholder="Digite o email do login"
                        valor={email}
                        aoAlterado={setEmail}
                        className={inputClassName}
                    /> : null }


                    {!props.usuarioEdicao ?
                        <CampoInput
                            id="senha"
                            name="senha"
                            type="password"
                            label="Senha"
                            labelClassName={labelClassName}
                            autoComplete="senha"
                            obrigatorio={true}
                            placeholder="Digite a sua senha"
                            valor={senha}
                            aoAlterado={setSenha}
                            className={inputClassName}
                        /> : null}

                    <CampoInput
                        id="numero"
                        name="numero"
                        type="text"
                        label="Telefone"
                        labelClassName={labelClassName}
                        autoComplete="numero"
                        obrigatorio={true}
                        placeholder="Digite o seu número de telefone"
                        valor={numero}
                        aoAlterado={setNumero}
                        className={inputClassName}
                    />

                    <CampoInput
                        id="cidade"
                        name="cidade"
                        type="text"
                        label="Cidade"
                        labelClassName={labelClassName}
                        autoComplete="cidade"
                        obrigatorio={true}
                        placeholder="Digite a sua cidade"
                        valor={cidade}
                        aoAlterado={setCidade}
                        className={inputClassName}
                    />

                    <CampoInput
                        id="imagem"
                        name="imagem"
                        type="file"
                        label="Foto (Opcional)"
                        labelClassName={labelClassName}
                        autoComplete="imagem"
                        obrigatorio={false}
                        placeholder="Selecione a imagem"
                        valor={imagem}
                        aoAlterado={salvarImage}
                        className={inputClassName}
                    />

                    {previewImagem && (
                        <PreviewImagem
                            titulo="Imagem atual:"
                            itens={[{ key: 'avatar', src: previewImagem }]}
                        />
                    )}
                </div>

                <div className="mt-8 space-y-4">
                    <Botao
                        className={'botao-padrao'}
                    >
                        {props.usuarioEdicao ? 'Salvar Alterações' : 'Cadastrar'}
                    </Botao>

                    {!props.usuarioEdicao ?
                        <p className="text-center text-sm text-slate-500">
                            Já tem conta?{' '}
                            <Link
                                to={props.href}
                                className="font-semibold text-[#5a1f62] underline-offset-4 transition hover:underline"
                            >
                                Faça login
                            </Link>
                        </p>
                        :
                        <p className="text-center text-sm text-slate-500">
                            <Link
                                to={props.href}
                                className="font-semibold text-[#5a1f62] underline-offset-4 transition hover:underline"
                            >
                                Voltar
                            </Link>
                        </p>
                    }
                </div>
            </form>
        </section>
    )
}