import axios from 'axios';
import { eventBus } from '../utils/eventBus';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            const isLoginRoute = error.config?.url?.includes('/login');
            if (!isLoginRoute) {
                eventBus.emit('session-expired');
            }
        }
        return Promise.reject(error);
    }
);

export default api;
