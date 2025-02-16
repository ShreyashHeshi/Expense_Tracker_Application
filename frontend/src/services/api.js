import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1', // Your backend API URL
    withCredentials: true,
});

export const api = {
    register: (data) => api.post('/user/register', data),
    login: (data) => api.post('/user/login', data),
    getExpenses: () => api.get('/expense'),
    addExpense: (data) => api.post('/expense/add', data),
    removeExpense: (id) => api.delete(`/expense/remove/${id}`),
};

