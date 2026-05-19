export const ENDPOINTS = {
    auth: {
        login: '/auth/login',
        logout: '/auth/logout',
        me: '/auth/me',
    },
    dashboard: {
        vendasPorCategoria: '/dashboard/vendas-por-categoria',
        qtdRegistrosPorMes: '/dashboard/qtd-registros-por-mes-categoria',
        qtdPorVendedor: '/dashboard/qtd-por-vendedor',
    },
    produtos: {
        busca: '/shop/search',
        base: '/shop',
        porId: (id) => `/shop/${id}`,
    },
    usuarios: {
        busca: '/users/search',
        base: '/users',
        porId: (id) => `/users/${id}`,
    },
    verificacao: {
        enviarCadastro: '/verification/registration/send',
        enviarReset: '/verification/password-reset/send',
        confirmarReset: '/verification/password-reset/confirm',
    },
};
