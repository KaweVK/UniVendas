export const FundoDecorado = ({ children }) => (
    <>
        <main className="relative min-h-screen isolate overflow-hidden bg-[#f7eff8]">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(107,46,116,0.14),transparent)]"
            />
            <div
                aria-hidden="true"
                className="absolute left-[8%] top-24 h-64 w-64 rounded-full bg-fuchsia-200/60 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="absolute right-[6%] top-1/3 h-72 w-72 rounded-full bg-violet-200/60 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/80 blur-3xl"
            />

            <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
                {children}
            </section>
        </main>
    </>
);