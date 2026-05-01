
export const PreviewImagem = ({ p, imagem }) => {
    return (
        <>
            <div>
                <p className="mb-2 block text-sm font-medium text-slate-700">{p}</p>
                <img
                    src={imagem}
                    alt="Atual"
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px', border: '2px solid white' }}
                />
            </div>
        </>
    )

}