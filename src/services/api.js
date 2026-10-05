import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL; // solo existe en desarrollo

const cliente = axios.create({
  baseURL: API_URL || process.env.BASE_URL, // en producción: /PROYECTO-7/
  timeout: 8000
});

export const obtenerProductos = () =>
  API_URL
    ? cliente.get('/productos').then((r) => r.data)
    : cliente.get('db.json').then((r) => r.data.productos);
