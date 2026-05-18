import api from './api.js';
import { ENDPOINTS } from './endpoints.js';
import { limparParams } from '../utils/buildQueryParams.js';

const montarFormData = (produto, { edicao = false } = {}) => {
    const fd = new FormData();
    fd.append('name', produto.nome);
    fd.append('description', produto.descricao);
    fd.append('amount', produto.quantidade);
    fd.append('price', produto.preco);
    fd.append('category', produto.categoria);
    fd.append('availability', produto.disponivel);

    (produto.novasImagens ?? []).forEach((arquivo) => {
        if (arquivo instanceof File) fd.append('images', arquivo);
    });

    if (edicao) {
        (produto.imagensMantidas ?? []).forEach((url) =>
            fd.append('imagensMantidas', url)
        );
    }

    return fd;
};

export const buscarProdutos = (filtros, signal) =>
    api
        .get(ENDPOINTS.produtos.busca, {
            params: limparParams(filtros),
            signal,
        })
        .then((r) => r.data);

export const obterProduto = (id, signal) =>
    api.get(ENDPOINTS.produtos.porId(id), { signal }).then((r) => r.data);

export const criarProduto = (produto) =>
    api.post(ENDPOINTS.produtos.base, montarFormData(produto, { edicao: false }))
    .then((r) => r.data);

export const atualizarProduto = (id, produto) =>
    api.put(ENDPOINTS.produtos.porId(id), montarFormData(produto, { edicao: true }))
    .then((r) => r.data);

export const excluirProduto = (id) =>
    api.delete(ENDPOINTS.produtos.porId(id)).then((r) => r.data);
