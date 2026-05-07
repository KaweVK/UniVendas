import api from './api.js';
import { ENDPOINTS } from './endpoints.js';

export const login = (email, senha) =>
    api.post(ENDPOINTS.auth.login, { email, password: senha }).then((r) => r.data);

export const logout = () =>
    api.post(ENDPOINTS.auth.logout).then((r) => r.data);

export const obterSessao = (signal) =>
    api.get(ENDPOINTS.auth.me, { signal }).then((r) => r.data);
