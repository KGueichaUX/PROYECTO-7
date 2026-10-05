import axios from 'axios';

const cliente = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3001',
  timeout: 8000
});

export const obtenerProductos = () => cliente.get('/productos').then((r) => r.data);
