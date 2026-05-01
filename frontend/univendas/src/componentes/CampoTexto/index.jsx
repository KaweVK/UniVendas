export const CampoTexto = (props) => {
    const aoDigitar = (evento) => {
        if (props.type === 'file') {
            props.aoAlterado(evento.target.files[0])
        } else {
            props.aoAlterado(evento.target.value)
        }
    }

    return (
        <div>
            <label htmlFor={props.id} className={props.labelClassName}>
                {props.label}
            </label>
            <input
                id={props.id}
                name={props.name}
                type={props.type}
                autoComplete={props.autoComplete}
                required={props.obrigatorio}
                placeholder={props.placeholder}
                value={props.type === 'file' ? undefined : props.valor}
                onChange={aoDigitar}
                className={props.className}
            />
        </div>
    )
}