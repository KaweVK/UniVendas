import { formatarCategoria } from "../../utils/formatter";

export const ListaSuspensa = (props) => {
    return (
        <div>
            <label htmlFor={props.id} className={props.labelClassName}>
                {props.label}
            </label>
            <select
                id={props.id}
                required={props.obrigatorio}
                value={props.valor}
                onChange={evento => props.aoAlterado(evento.target.value)}
                className={props.className}
            >
                <option value="">Selecione a Categoria</option>
                {formatarCategoria(props.itens).map(item => {
                    return <option key={item.valor} value={item.valor}>{item.rotulo}</option>;
                })}
            </select>
        </div>
    )
}
