/* eslint-disable react-hooks/set-state-in-effect */
import './Formulario.css'
import { CampoInput } from '../CampoInput'
import { ListaSuspensa } from '../ListaSuspensa'
import { PreviewImagem } from '../PreviewImagem'
import { Botao } from '../Botao'
import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'

const labelClassName = 'mb-2 block text-sm font-medium text-slate-700'
const inputClassName =
    'w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#8a4d94] focus:ring-4 focus:ring-fuchsia-100'

export const FormularioCadastroProduto = (props) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagensExistentes, setImagensExistentes] = useState([]);
    const [novasImagens, setNovasImagens] = useState([]);
    const [disponivel, setDisponivel] = useState("AVAILABLE");

    useEffect(() => {
        if (props.produtoEdicao) {
            setNome(props.produtoEdicao.name);
            setDescricao(props.produtoEdicao.description);
            setQuantidade(props.produtoEdicao.amount);
            setPreco(props.produtoEdicao.price);
            setCategoria(props.produtoEdicao.category);
            setImagensExistentes(props.produtoEdicao.images ?? []);
            setNovasImagens([]);
            setDisponivel(props.produtoEdicao.availability);
        }
    }, [props.produtoEdicao]);

    const previewsNovas = useMemo(
        () => novasImagens.map((file) => ({
            key: `${file.name}-${file.lastModified}-${file.size}`,
            src: URL.createObjectURL(file),
            file,
        })),
        [novasImagens]
    );

    useEffect(() => {
        return () => previewsNovas.forEach((p) => URL.revokeObjectURL(p.src));
    }, [previewsNovas]);

    const itensPreview = [
        ...imagensExistentes.map((url) => ({
            key: url,
            src: url,
            onRemover: () => setImagensExistentes((prev) => prev.filter((u) => u !== url)),
        })),
        ...previewsNovas.map((p) => ({
            key: p.key,
            src: p.src,
            onRemover: () => setNovasImagens((prev) => prev.filter((f) => f !== p.file)),
        })),
    ];

    const aoAdicionarImagens = (arquivos) => {
        const lista = Array.isArray(arquivos) ? arquivos : (arquivos ? [arquivos] : []);
        if (lista.length) setNovasImagens((prev) => [...prev, ...lista]);
    };

    const aoSalvar = (evento) => {
        evento.preventDefault()
        props.aoCadastrarProduto({
            nome,
            descricao,
            quantidade,
            preco,
            categoria,
            novasImagens,
            imagensMantidas: imagensExistentes,
            disponivel,
        })
        if (!props.produtoEdicao) {
            setNome('')
            setDescricao('')
            setQuantidade('')
            setPreco('')
            setCategoria('')
            setImagensExistentes([])
            setNovasImagens([])
            setDisponivel("AVAILABLE")
        }
    }

    return (
        <section className="h-full">
            <form
                onSubmit={aoSalvar}
                className="flex h-full flex-col justify-center rounded-[28px] bg-white/80 p-6 shadow-[0_24px_70px_-50px_rgba(68,18,74,0.45)] ring-1 ring-slate-200/80 backdrop-blur sm:p-8 lg:min-h-[560px] lg:p-10"
            >
                <div className="mb-8">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#6b2e74]/70">
                        {props.produtoEdicao ? 'Edição do Produto' : 'Cadastro de Produto'}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-[2rem]">
                        {props.produtoEdicao ? 'Edite o seu produto' : 'Crie seu produto'}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        {props.produtoEdicao ? 'Edite os dados do produto' : 'Preencha os dados para criar seu produto'}
                    </p>
                </div>

                <div className="space-y-5">
                    <CampoInput
                        id="nome"
                        name="nome"
                        type="text"
                        label="Nome"
                        labelClassName={labelClassName}
                        autoComplete="nome"
                        obrigatorio={true}
                        placeholder="Digite o nome do produto"
                        valor={nome}
                        aoAlterado={setNome}
                        className={inputClassName}
                    />
                    <CampoInput
                        id="descricao"
                        name="descricao"
                        type="text"
                        label="Descrição"
                        labelClassName={labelClassName}
                        autoComplete="descricao"
                        obrigatorio={true}
                        placeholder="Digite a descrição do produto"
                        valor={descricao}
                        aoAlterado={setDescricao}
                        className={inputClassName}
                    />
                    <CampoInput
                        id="quantidade"
                        name="quantidade"
                        type="text"
                        label="Quantidade"
                        labelClassName={labelClassName}
                        autoComplete="quantidade"
                        obrigatorio={true}
                        placeholder="Digite a quantidade do produto"
                        valor={quantidade}
                        aoAlterado={setQuantidade}
                        className={inputClassName}
                    />
                    <CampoInput
                        id="preco"
                        name="preco"
                        type="text"
                        label="Preço"
                        labelClassName={labelClassName}
                        autoComplete="preco"
                        obrigatorio={true}
                        placeholder="Digite o preço do produto"
                        valor={preco}
                        aoAlterado={setPreco}
                        className={inputClassName}
                    />
                    <CampoInput
                        id="imagem"
                        name="imagem"
                        type="file"
                        label="Imagens"
                        labelClassName={labelClassName}
                        obrigatorio={false}
                        placeholder="Imagens do produto"
                        multiple={true}
                        accept="image/*"
                        aoAlterado={aoAdicionarImagens}
                        className={inputClassName}
                    />

                    {itensPreview.length > 0 && (
                        <PreviewImagem titulo="Imagens do produto:" itens={itensPreview} />
                    )}

                    <ListaSuspensa
                        id="categoria"
                        obrigatorio={true}
                        itens={props.categorias}
                        label='Categoria'
                        labelClassName={labelClassName}
                        valor={categoria}
                        aoAlterado={valor => setCategoria(valor)}
                        className={inputClassName}
                    />

                    {props.produtoEdicao && (
                        <ListaSuspensa
                            id="disponibilidade"
                            obrigatorio={true}
                            itens={props.disponivel}
                            label='Disponibilidade'
                            labelClassName={labelClassName}
                            valor={disponivel}
                            aoAlterado={valor => setDisponivel(valor)}
                            className={inputClassName}
                        />
                    )}

                </div>

                <div className="mt-8 space-y-4">
                    <Botao className='botao-padrao'>
                        {props.produtoEdicao ? 'Salvar Alterações' : 'Cadastrar'}
                    </Botao>
                    <p className='text-center text-sm text-slate-500'>
                        <Link
                            to={"/produtos"}
                            className="font-semibold text-[#5a1f62] underline-offset-4 transition hover:underline"
                        >
                            Cancelar
                        </Link>
                    </p>
                </div>
            </form>
        </section>
    )
}
