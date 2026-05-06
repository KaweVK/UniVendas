import {
    BanknotesIcon,
    CheckBadgeIcon,
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
    TagIcon,
    UserCircleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { formatarPreco, formatarQuantidade, formatarCategoria } from '../../utils/formatter';

const LinhaInformacao = ({ label, valor }) => (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-4 first:pt-0 last:border-b-0 last:pb-0">
        <dt className="text-sm font-medium text-slate-500">{label}</dt>
        <dd className="max-w-[60%] text-right text-sm font-semibold text-slate-800 sm:text-base">
            {valor}
        </dd>
    </div>
);

export const DetalheProduto = ({
    nome,
    descricao,
    preco,
    imagens = [],
    categoria,
    quantidade,
    vendedor,
    acoes,
}) => {
    const [indiceImagemAtual, setIndiceImagemAtual] = useState(0);
    const quantidadeNumerica = Number(quantidade);
    const estoqueDisponivel = !Number.isNaN(quantidadeNumerica) && quantidadeNumerica > 0;
    const imagensCarrossel = imagens.length > 0 ? imagens : ['/imagens/Logos/avatar.webp'];
    const imagemExibida = imagensCarrossel[indiceImagemAtual];
    const nomeVendedor = vendedor?.name || 'Vendedor nao identificado';
    const cidadeVendedor = vendedor?.city || 'Cidade nao informada';
    const emailVendedor = vendedor?.email || 'Email nao informado';
    const telefoneVendedor = vendedor?.phoneNumber || 'Telefone nao informado';

    const proximaImagem = () => {
        setIndiceImagemAtual((prev) => (prev === imagensCarrossel.length - 1 ? 0 : prev + 1));
    };

    const imagemAnterior = () => {
        setIndiceImagemAtual((prev) => (prev === 0 ? imagensCarrossel.length - 1 : prev - 1));
    };

    return (
        <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
            <article className="overflow-hidden rounded-[32px] border border-white/60 bg-white/55 shadow-[0_32px_90px_-34px_rgba(62,16,68,0.45)] backdrop-blur-xl">

                <div className="relative overflow-hidden p-8 text-white sm:p-10">

                    <div className="absolute inset-0">
                        <img
                            src={imagemExibida}
                            alt={nome}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(54,16,60,0.32),rgba(54,16,60,0.82))]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.12),_transparent_32%)]" />
                    </div>

                    <div className="relative">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                                Produto
                            </span>
                            <span className="inline-flex rounded-full border border-emerald-200/60 bg-emerald-100/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-50 backdrop-blur-sm">
                                {estoqueDisponivel ? 'Disponível' : 'Indisponível'}
                            </span>
                        </div>

                        <div className="mt-8 flex flex-col items-center text-center">
                            <div className="w-full max-w-[220px] rounded-[30px] border border-white/20 bg-white/10 p-4 shadow-[0_22px_60px_-24px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:max-w-[240px] sm:p-5">
                                <img
                                    src={imagemExibida}
                                    alt={nome}
                                    className="aspect-square w-full rounded-[24px] object-cover shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)]"
                                />
                            </div>
                            {imagensCarrossel.length > 1 && (
                                <div className="mt-6 flex justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={imagemAnterior}
                                        className="cursor-pointer rounded-full border border-white/30 bg-white/10 p-2 text-white/80 backdrop-blur-sm transition hover:bg-white/20"
                                        aria-label="Imagem anterior"
                                    >
                                        <ChevronLeftIcon className="size-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={proximaImagem}
                                        className="cursor-pointer rounded-full border border-white/30 bg-white/10 p-2 text-white/80 backdrop-blur-sm transition hover:bg-white/20"
                                        aria-label="Próxima imagem"
                                    >
                                        <ChevronRightIcon className="size-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white/70 p-6 sm:p-8 lg:p-10">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#6b2e74]/70">
                            Dados do produto
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                            {nome || 'Produto nao identificado'}
                        </h2>
                        <p className="mt-3 text-base leading-7 text-slate-600">
                            {descricao || 'Este anuncio ainda nao possui uma descricao detalhada.'}
                        </p>
                    </div>

                    <section className="mt-8 rounded-[28px] border border-[#6b2e74]/10 bg-gradient-to-br from-[#fbf6fc] via-white to-[#f6f1f7] p-5 shadow-[0_24px_70px_-50px_rgba(68,18,74,0.45)]">
                        <div
                            className="flex items-start gap-4 rounded-[24px] border border-slate-200/80 bg-white/70 p-5"
                        >
                            <div className="rounded-2xl bg-[#f4e8f6] p-3 text-[#6b2e74]">
                                <BanknotesIcon className="size-6" />
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                    Oferta em destaque
                                </p>
                                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                                    Confira aqui valores e disponibilidade do produto
                                </h3>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                            <div className="rounded-[24px] border border-slate-200/80 bg-white/80 p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                    Preço do produto
                                </p>
                                <p className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                                    {formatarPreco(preco)}
                                </p>
                            </div>

                            <div className="flex rounded-[24px] border border-slate-200/80 bg-white/80 p-5">
                                <div className="flex items-center justify-center align-center gap-3 ">
                                    <div className="rounded-2xl bg-[#f4e8f6] p-3 text-[#6b2e74]">
                                        <CheckBadgeIcon className="size-5" />
                                    </div>
                                    <div className=''>
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                            Estoque
                                        </p>
                                        <p className="mt-2 text-xl font-semibold text-slate-900">
                                            {formatarQuantidade(quantidade)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#6b2e74]/10 bg-white px-4 py-2 text-sm font-medium text-[#6b2e74]">
                                <TagIcon className="size-4" />
                                {formatarCategoria(categoria) || 'Categoria nao informada'}
                            </span>
                        </div>
                    </section>
                </div>
            </article>

            <aside className="flex flex-col gap-6">
                <section className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-[0_24px_70px_-50px_rgba(68,18,74,0.45)] backdrop-blur sm:p-8">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#6b2e74]/70">
                        Informações do anúncio
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                        Tudo o que importa em um só lugar
                    </h2>

                    <dl className="mt-6">
                        <LinhaInformacao
                            label="Disponibilidade"
                            valor={estoqueDisponivel ? 'Pronto para negociação' : 'Confirmar com o vendedor'}
                        />
                        <LinhaInformacao
                            label="Categoria"
                            valor={formatarCategoria(categoria) || 'Não informada'}
                        />
                        <LinhaInformacao
                            label="Quantidade"
                            valor={formatarQuantidade(quantidade)}
                        />
                    </dl>
                </section>

                <section className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-[0_24px_70px_-50px_rgba(68,18,74,0.45)] backdrop-blur sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className="rounded-3xl bg-[#f4e8f6] p-4 text-[#6b2e74]">
                            <UserCircleIcon className="size-7" />
                        </div>
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#6b2e74]/70">
                                Vendedor
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                                {nomeVendedor}
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Veja quem publicou o produto e os principais dados para contato.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="flex items-center gap-3 rounded-2xl bg-slate-50/80 px-4 py-3">
                            <MapPinIcon className="size-5 text-[#6b2e74]" />
                            <span className="text-sm font-medium text-slate-700">{cidadeVendedor}</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl bg-slate-50/80 px-4 py-3">
                            <EnvelopeIcon className="size-5 text-[#6b2e74]" />
                            <span className="text-sm font-medium text-slate-700">{emailVendedor}</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl bg-slate-50/80 px-4 py-3">
                            <PhoneIcon className="size-5 text-[#6b2e74]" />
                            <span className="text-sm font-medium text-slate-700">{telefoneVendedor}</span>
                        </div>
                    </div>
                </section>

                {acoes ? (
                    <section className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-[0_24px_70px_-50px_rgba(68,18,74,0.45)] backdrop-blur sm:p-8">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#6b2e74]/70">
                            Ações
                        </p>
                        <div className="mt-5 flex flex-col gap-3">
                            {acoes}
                        </div>
                    </section>
                ) : null}
            </aside>
        </div>
    );
};
