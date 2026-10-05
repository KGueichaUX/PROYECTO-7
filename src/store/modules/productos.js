import { obtenerProductos } from '@/services/api';

export default {
  namespaced: true,
  state: () => ({ items: [], cargando: false, error: null }),
  getters: {
    // Lista de categorías derivada de los datos (sin duplicados).
    categorias: (state) => ['Todas', ...new Set(state.items.map((p) => p.categoria))],
    // Productos filtrados por categoría y texto, usando el módulo "filtros".
    productosFiltrados: (state, getters, rootState) => {
      const { categoria, busqueda } = rootState.filtros;
      const texto = busqueda.trim().toLowerCase();
      return state.items.filter(
        (p) =>
          (categoria === 'Todas' || p.categoria === categoria) &&
          (!texto || `${p.nombre} ${p.marca}`.toLowerCase().includes(texto))
      );
    }
  },
  mutations: {
    INICIAR_CARGA(state) { state.cargando = true; state.error = null; },
    GUARDAR_PRODUCTOS(state, items) { state.items = items; state.cargando = false; },
    GUARDAR_ERROR(state, mensaje) { state.error = mensaje; state.cargando = false; }
  },
  actions: {
    async cargarProductos({ commit }) {
      commit('INICIAR_CARGA');
      try {
        commit('GUARDAR_PRODUCTOS', await obtenerProductos());
      } catch (e) {
        commit('GUARDAR_ERROR', 'No se pudieron cargar los productos. Revisa tu conexión e inténtalo de nuevo.');
      }
    }
  }
};
