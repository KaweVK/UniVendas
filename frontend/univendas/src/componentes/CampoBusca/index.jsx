import { Botao } from '../Botao'
import './CampoBusca.css'

export const CampoBusca = ({ valor, aoDigitar, placeholder, label, pesquisa }) => {
    return (
        <div className='campo-busca'>
            <form onSubmit={pesquisa}>
                <label>{label}</label>
                <input value={valor} onChange={evento => aoDigitar(evento.target.value)} placeholder={placeholder} />
            </form>
        </div>
    )
}