export const CampoInput = (props) => {
    const isFile = props.type === 'file'

    const aoDigitar = (e) => {
        if (isFile) {
            const arquivos = Array.from(e.target.files)
            props.aoAlterado(props.multiple ? arquivos : arquivos[0])
            e.target.value = ''
        } else {
            props.aoAlterado(e.target.value)
        }
    }

    const inputProps = isFile
        ? { multiple: props.multiple, accept: props.accept }
        : { value: props.valor }

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
                onChange={aoDigitar}
                className={props.className}
                {...inputProps}
            />
        </div>
    )
}
