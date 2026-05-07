import api from './api.js';
import { ENDPOINTS } from './endpoints.js';

export const enviarCodigoCadastro = (email) =>
    api.post(ENDPOINTS.verificacao.enviarCadastro, { email }).then((r) => r.data);

export const enviarCodigoReset = (email) =>
    api.post(ENDPOINTS.verificacao.enviarReset, { email }).then((r) => r.data);

export const confirmarReset = ({ email, codigo, novaSenha }) =>
    api
        .post(ENDPOINTS.verificacao.confirmarReset, {
            email,
            code: codigo,
            newPassword: novaSenha,
        })
        .then((r) => r.data);
