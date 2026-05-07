import api from './api.js';
import { ENDPOINTS } from './endpoints.js';
import { limparParams } from '../utils/buildQueryParams.js';

export const buscarProdutos = (filtros, signal) =>
    api.get(ENDPOINTS.PRODUTOS_BUSCA, {
        params: limparParams(filtros),
        signal,
    });
