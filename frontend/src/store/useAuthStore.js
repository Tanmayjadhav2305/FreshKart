import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('userInfo')) || null,
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post('/api/users/login', { email, password }, config);

            localStorage.setItem('userInfo', JSON.stringify(data));
            set({ user: data, loading: false });
        } catch (error) {
            set({
                error: error.response && error.response.data.message ? error.response.data.message : error.message,
                loading: false
            });
        }
    },

    register: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post('/api/users', { name, email, password }, config);

            localStorage.setItem('userInfo', JSON.stringify(data));
            set({ user: data, loading: false });
        } catch (error) {
            set({
                error: error.response && error.response.data.message ? error.response.data.message : error.message,
                loading: false
            });
        }
    },

    logout: () => {
        localStorage.removeItem('userInfo');
        set({ user: null });
    },
}));

export default useAuthStore;
