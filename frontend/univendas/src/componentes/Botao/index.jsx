import './Botao.css';

export const Botao = (props) => {
    const { as: Componente = 'button', className, children, ...resto } = props;

    return (
        <Componente className={className} {...resto}>
            {children}
        </Componente>
    );
};
