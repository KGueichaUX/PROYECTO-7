<template>
  <v-app-bar color="primary" flat>
    <v-app-bar-title class="font-weight-bold">
      <v-icon start>mdi-chip</v-icon>TecnoMarket
    </v-app-bar-title>
    <v-badge :content="totalFavoritos" :model-value="totalFavoritos > 0" color="secondary" class="mr-2">
      <v-icon aria-label="Productos favoritos" icon="mdi-heart" />
    </v-badge>
    <v-btn
      :icon="esOscuro ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      :aria-label="esOscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
      data-testid="boton-tema"
      @click="alternarTema"
    />
  </v-app-bar>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useTheme } from 'vuetify';

export default {
  name: 'AppHeader',
  setup() {
    const theme = useTheme();
    const store = useStore();
    const esOscuro = computed(() => theme.global.current.value.dark);
    const totalFavoritos = computed(() => store.getters['favoritos/total']);
    const alternarTema = () => {
      theme.global.name.value = esOscuro.value ? 'light' : 'dark';
      localStorage.setItem('tema', theme.global.name.value);
    };
    return { esOscuro, totalFavoritos, alternarTema };
  }
};
</script>
