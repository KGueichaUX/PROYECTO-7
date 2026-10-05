export default {
  namespaced: true,
  state: () => ({ categoria: 'Todas', busqueda: '' }),
  mutations: {
    SET_CATEGORIA(state, categoria) { state.categoria = categoria || 'Todas'; },
    SET_BUSQUEDA(state, texto) { state.busqueda = texto || ''; }
  },
  actions: {
    seleccionarCategoria({ commit }, c) { commit('SET_CATEGORIA', c); },
    buscar({ commit }, t) { commit('SET_BUSQUEDA', t); }
  }
};
