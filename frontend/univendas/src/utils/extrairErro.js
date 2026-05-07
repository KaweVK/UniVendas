export const extrairErro = (erro, fallback = 'Erro inesperado.') => {
    const data = erro?.response?.data;
    if (data?.fields?.length) {
        return data.fields.map((f) => `${f.field}: ${f.error}`).join('\n');
    }
    return data?.message || erro?.message || fallback;
};
