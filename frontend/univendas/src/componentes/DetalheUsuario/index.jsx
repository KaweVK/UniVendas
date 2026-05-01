import {
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';

const ItemContato = ({ icon: Icone, titulo, valor, href }) => {
    const conteudo = (
        <div className="flex items-start gap-4 rounded-[26px] border border-slate-200/80 bg-slate-50/80 p-5">
            <div className="rounded-2xl bg-[#f4e8f6] p-3 text-[#6b2e74]">
                <Icone className="size-5" />
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {titulo}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-800 sm:text-base">
                    {valor}
                </p>
            </div>
        </div>
    );

    if (!href) {
        return conteudo;
    }

    return (
        <a
            href={href}
            className="transition hover:-translate-y-0.5 hover:shadow-md"
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
        >
            {conteudo}
        </a>
    );
};

const LinhaResumo = ({ label, valor }) => (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-4 first:pt-0 last:border-b-0 last:pb-0">
        <dt className="text-sm font-medium text-slate-500">{label}</dt>
        <dd className="max-w-[60%] text-right text-sm font-semibold text-slate-800 sm:text-base">
            {valor}
        </dd>
    </div>
);

export const DetalheUsuario = ({
    nome,
    email,
    telefone,
    img,
    cidade,
    eDono,
    acoes,
}) => {
    const imagemPerfil = img || '/imagens/Logos/avatar.webp';
    const telefoneSanitizado = telefone ? telefone.replace(/\D/g, '') : '';

    return (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <article className="overflow-hidden rounded-[32px] border border-white/60 bg-white/55 shadow-[0_32px_90px_-34px_rgba(62,16,68,0.45)] backdrop-blur-xl">

                <div className="relative overflow-hidden bg-gradient-to-br from-[#4c1454] via-[#6b2e74] to-[#27102f] p-8 text-white sm:p-10">
                    <div className="absolute inset-0">
                        <img
                            src={imagemPerfil}
                            alt={nome}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(54,16,60,0.32),rgba(54,16,60,0.82))]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.12),_transparent_32%)]" />
                    </div>

                    <div className="relative">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                                Usuário
                            </span>
                            <span className="inline-flex rounded-full border border-emerald-200/60 bg-emerald-100/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-50 backdrop-blur-sm">
                                {eDono ? 'Seu perfil' : 'Perfil público'}
                            </span>
                        </div>

                        <div className="mt-8 flex flex-col items-center text-center">
                            <div className="w-full max-w-[220px] rounded-[30px] border border-white/20 bg-white/10 p-4 shadow-[0_22px_60px_-24px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:max-w-[240px] sm:p-5">
                                <img
                                    src={imagemPerfil}
                                    alt={nome}
                                    className="aspect-square w-full rounded-[24px] object-cover shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/70 p-6 sm:p-6 lg:p-10">
                    <section className="mt-8 rounded-[28px] border border-[#6b2e74]/10 bg-gradient-to-br from-[#fbf6fc] via-white to-[#f6f1f7] p-5 shadow-[0_24px_70px_-50px_rgba(68,18,74,0.45)]">
                        <div
                            className="flex items-start gap-4 rounded-[24px] border border-slate-200/80 bg-white/70 p-5"
                        >
                            <div className="rounded-2xl bg-[#f4e8f6] p-3 text-[#6b2e74]">
                                <UserCircleIcon className="size-6" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                    Visão geral
                                </p>
                                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                                    Dados do usuário
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Confira alguns detalhes a mais do usuário.
                                </p>
                            </div>
                        </div>

                        <dl className="mt-6">
                            <LinhaResumo label="Nome" valor={nome || 'Não informado'} />
                            <LinhaResumo label="Email" valor={email || 'Não informado'} />
                            <LinhaResumo label="Telefone" valor={telefone || 'Não informado'} />
                            <LinhaResumo label="Cidade" valor={cidade || 'Não informada'} />
                        </dl>
                    </section>
                </div>
            </article>

            <aside className="flex flex-col gap-6">
                <section className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-[0_24px_70px_-50px_rgba(68,18,74,0.45)] backdrop-blur sm:p-8">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#6b2e74]/70">
                        Contato rápido
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                        Formas mais diretas de conversar
                    </h2>

                    <div className="mt-6 space-y-4">
                        <ItemContato
                            icon={EnvelopeIcon}
                            titulo="Email principal"
                            valor={email || 'Nao informado'}
                            href={email ? `mailto:${email}` : undefined}
                        />
                        <ItemContato
                            icon={PhoneIcon}
                            titulo="WhatsApp"
                            valor={telefone || 'Nao informado'}
                            href={telefoneSanitizado ? `https://wa.me/${telefoneSanitizado}` : undefined}
                        />
                    </div>
                </section>

                {eDono ? (
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
