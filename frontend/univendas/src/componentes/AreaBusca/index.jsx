import { CATEGORIAS } from '../../constants/categorias';
import './AreaBusca.css';

export const AreaBusca = ({ valor, aoDigitar, placeholder, label, pesquisa, filtros, aoAlterar, aoLimpar }) => {

    const setCampo = (campo) => (evento) =>
        aoAlterar({ ...filtros, [campo]: evento.target.value, page: 0 });

    return (
        <div className="w-full flex flex-col items-center justify-center px-2 lg:px-8 mt-8 ">
            <div className='campo-busca'>
                <form onSubmit={pesquisa}>
                    <label>{label}</label>
                    <input value={valor} onChange={evento => aoDigitar(evento.target.value)} placeholder={placeholder} />
                </form>
            </div>

            <div className='filtros-produtos'>
                <div className='filtro-campo'>
                    <label htmlFor='filtro-categoria'>Categoria</label>
                    <select
                        id='filtro-categoria'
                        value={filtros.category ?? ''}
                        onChange={setCampo('category')}
                    >
                        <option value=''>Todas</option>
                        {CATEGORIAS.map((c) => (
                            <option key={c.valor} value={c.valor}>{c.rotulo}</option>
                        ))}
                    </select>
                </div>

                <div className='filtro-campo'>
                    <label htmlFor='filtro-preco-min'>Preço mínimo</label>
                    <input
                        id='filtro-preco-min'
                        type='number'
                        min='0'
                        value={filtros.priceGreater ?? ''}
                        onChange={setCampo('priceGreater')}
                        placeholder='R$'
                    />
                </div>

                <div className='filtro-campo'>
                    <label htmlFor='filtro-preco-max'>Preço máximo</label>
                    <input
                        id='filtro-preco-max'
                        type='number'
                        min='0'
                        value={filtros.priceLess ?? ''}
                        onChange={setCampo('priceLess')}
                        placeholder='R$'
                    />
                </div>

                <button type='button' className='filtro-limpar' onClick={aoLimpar}>
                    Limpar filtros
                </button>
            </div>
        </div>

    )
}