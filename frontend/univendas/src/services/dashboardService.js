import api from './api.js';
import { ENDPOINTS } from './endpoints.js';

export const vendasPorCategoria = (signal) =>
    api.get(ENDPOINTS.dashboard.vendasPorCategoria, { signal })
        .then((r) => r.data);

export const qtdRegistrosPorMes = (signal) =>
    api.get(ENDPOINTS.dashboard.qtdRegistrosPorMes, { signal })
        .then((r) => r.data);
