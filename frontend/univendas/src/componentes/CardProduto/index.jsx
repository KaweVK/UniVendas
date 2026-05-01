export const CardProduto = ({ imagens, nome, descricao }) => {
    const imagemPrincipal = imagens[0];

    return (
        <div className="group flex h-[370px] w-72 flex-col overflow-hidden rounded-3xl bg-white/95 backdrop-blur shadow-md ring-1 ring-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-purple-300">

            <div className="relative h-52 w-full overflow-hidden bg-zinc-100">
                <img
                    src={imagemPrincipal}
                    alt={`Imagem do produto ${nome}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
            </div>

            <div className="flex flex-1 flex-col px-5 py-5 text-center">
                <h3 className="line-clamp-2 min-h-[20px] text-xl font-bold leading-7 tracking-tight text-zinc-800">
                    {nome}
                </h3>

                <p className="mt-3 line-clamp-4 text-sm leading-6 text-zinc-600">
                    {descricao}
                </p>
            </div>
        </div>
    );
};