import { createStore } from 'vuex';
import productos from './modules/productos';
import filtros from './modules/filtros';
import favoritos from './modules/favoritos';

// Función fábrica: permite crear un store limpio en cada prueba unitaria.
export const crearStore = () => createStore({ modules: { productos, filtros, favoritos } });

export default crearStore();
