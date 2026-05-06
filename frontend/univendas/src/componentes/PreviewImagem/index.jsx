export const PreviewImagem = ({ titulo, itens = [] }) => {
    if (!itens.length) return null

    return (
        <div>
            {titulo && (
                <p className="mb-2 block text-sm font-medium text-slate-700">{titulo}</p>
            )}
            <div className="flex flex-wrap gap-3">
                {itens.map(({ key, src, onRemover }) => (
                    <div key={key} className="relative">
                        <img
                            src={src}
                            alt=""
                            style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                                borderRadius: '10px',
                                border: '2px solid white',
                            }}
                        />
                        {onRemover && (
                            <button
                                type="button"
                                onClick={onRemover}
                                aria-label="Remover imagem"
                                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-700 shadow ring-1 ring-slate-200 hover:bg-slate-100"
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
