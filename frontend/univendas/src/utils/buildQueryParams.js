export const limparParams = (obj) =>
    Object.fromEntries(
        Object.entries(obj).filter(([, valor]) => {
            if (valor === '' || valor === null || valor === undefined) return false;
            if (Array.isArray(valor) && valor.length === 0) return false;
            return true;
        })
    );
