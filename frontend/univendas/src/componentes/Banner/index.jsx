export const Banner = () => {
    return (
        <aside className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#4c1454] via-[#6b2e74] to-[#27102f] p-8 text-white sm:p-10 lg:min-h-[620px]">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.28),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.16),_transparent_34%)]"
            />

            <div className="relative max-w-md">
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] text-white/70">
                    Mercado DCX
                </span>

                <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
                    Compre e venda com mais praticidade no UniVendas.
                </h1>

                <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
                    Um espaço pensado para conectar a comunidade acadêmica com
                    mais clareza, confiança e uma experiência mais agradável.
                </p>
            </div>

            <div className="relative mt-10">
                <div className="rounded-[28px] bg-white/95 p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)] ring-1 ring-black/5 sm:p-7">
                    <img
                        src="/imagens/Banner/univendas_logo.png"
                        alt="Univendas"
                        className="w-full"
                    />
                </div>
            </div>
        </aside>
    )
}
