export const ENDPOINTS = {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',

    PRODUTOS_TODOS: '/shop/all',
    PRODUTOS_BUSCA: '/shop/search',
    PRODUTO: '/shop',
    PRODUTO_ID: (id) => `/shop/${id}`,

    USUARIOS_BUSCA: '/users/search',
    USUARIO: '/users',
    USUARIO_ID: (id) => `/users/${id}`,

    VERIFICATION_REGISTRATION_SEND: '/verification/registration/send',
    VERIFICATION_PASSWORD_RESET_SEND: '/verification/password-reset/send',
    VERIFICATION_PASSWORD_RESET_CONFIRM: '/verification/password-reset/confirm',
};
