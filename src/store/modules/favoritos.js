const leer = () => {
  try { return JSON.parse(localStorage.getItem('favoritos')) || []; } catch (e) { return []; }
};

export default {
  namespaced: true,
  state: () => ({ ids: leer() }),
  getters: {
    total: (state) => state.ids.length,
    esFavorito: (state) => (id) => state.ids.includes(id)
  },
  mutations: {
    ALTERNAR(state, id) {
      state.ids = state.ids.includes(id) ? state.ids.filter((i) => i !== id) : [...state.ids, id];
      localStorage.setItem('favoritos', JSON.stringify(state.ids));
    }
  },
  actions: {
    alternarFavorito({ commit }, id) { commit('ALTERNAR', id); }
  }
};
