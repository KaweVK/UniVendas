import api from './api.js';
import { ENDPOINTS } from './endpoints.js';
import { limparParams } from '../utils/buildQueryParams.js';

const montarFormData = (usuario, { codigo } = {}) => {
    const fd = new FormData();
    fd.append('name', usuario.nome);
    fd.append('email', usuario.email);
    fd.append('password', usuario.senha);
    fd.append('phoneNumber', usuario.numero);
    fd.append('city', usuario.cidade);
    if (usuario.imagem instanceof File) {
        fd.append('image', usuario.imagem);
    }
    if (codigo != null) {
        fd.append('code', codigo);
    }
    return fd;
};

export const buscarUsuarios = (filtros, signal) =>
    api
        .get(ENDPOINTS.usuarios.busca, {
            params: filtros ? limparParams(filtros) : undefined,
            signal,
        })
        .then((r) => r.data);

export const obterUsuario = (id, signal) =>
    api.get(ENDPOINTS.usuarios.porId(id), { signal }).then((r) => r.data);

export const criarUsuario = (usuario, codigo) =>
    api
        .post(ENDPOINTS.usuarios.base, montarFormData(usuario, { codigo }))
        .then((r) => r.data);

export const atualizarUsuario = (id, usuario) =>
    api
        .put(ENDPOINTS.usuarios.porId(id), montarFormData(usuario))
        .then((r) => r.data);

export const excluirUsuario = (id) =>
    api.delete(ENDPOINTS.usuarios.porId(id)).then((r) => r.data);
