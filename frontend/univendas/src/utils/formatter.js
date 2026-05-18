import { CATEGORIAS, DISPONIBILIDADE } from '../constants/categorias';

export const formatarPreco = (preco) => {
    const precoNumerico = Number(preco);

    if (Number.isNaN(precoNumerico)) {
        return preco || 'Preço sob consulta';
    }

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(precoNumerico);
};

export const formatarQuantidade = (quantidade) => {
    const quantidadeNumerica = Number(quantidade);

    if (Number.isNaN(quantidadeNumerica)) {
        return 'Não informada';
    }

    return `${quantidadeNumerica} ${quantidadeNumerica === 1 ? 'unidade' : 'unidades'}`;
};

export const formatarCategoria = (valor) => {
    if (!valor) return '';
    return CATEGORIAS.find((c) => c.valor === valor)?.rotulo || valor;
};

export const formatarDisponibilidade = (valor) => {
    if (!valor) return '';
    return DISPONIBILIDADE.find((d) => d.valor === valor)?.rotulo || valor;
};

export const formatarMes = (mes) => {
    if (!mes) return '';
    return new Date(mes).toLocaleDateString('pt-BR', { month: 'long' });
};

