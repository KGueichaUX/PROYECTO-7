<template>
  <section aria-labelledby="titulo-catalogo">
    <h1 id="titulo-catalogo" class="text-h4 mb-1">Catálogo de tecnología</h1>
    <p class="text-body-1 mb-4">Explora, filtra y guarda tus productos favoritos.</p>

    <v-text-field
      :model-value="busqueda"
      label="Buscar por nombre o marca"
      prepend-inner-icon="mdi-magnify"
      clearable
      hide-details
      class="mb-4"
      data-testid="campo-busqueda"
      @update:model-value="buscar"
    />

    <v-chip-group
      :model-value="categoria"
      mandatory
      selected-class="text-primary"
      class="mb-4"
      data-testid="filtro-categorias"
      @update:model-value="seleccionarCategoria"
    >
      <v-chip v-for="c in categorias" :key="c" :value="c" filter variant="outlined">{{ c }}</v-chip>
    </v-chip-group>

    <div v-if="cargando" class="text-center py-12" data-testid="estado-cargando">
      <v-progress-circular indeterminate color="primary" size="48" />
      <p class="mt-3">Cargando productos…</p>
    </div>

    <v-alert v-else-if="error" type="error" variant="tonal" data-testid="estado-error">
      {{ error }}
      <template #append>
        <v-btn variant="outlined" @click="cargarProductos">Reintentar</v-btn>
      </template>
    </v-alert>

    <v-alert v-else-if="!productosFiltrados.length" type="info" variant="tonal" data-testid="estado-vacio">
      No encontramos productos con esos filtros. Prueba con otra categoría o borra la búsqueda.
    </v-alert>

    <v-row v-else data-testid="lista-productos">
      <v-col v-for="p in productosFiltrados" :key="p.id" cols="12" sm="6" md="4" lg="3">
        <ProductCard :producto="p" :es-favorito="esFavorito(p.id)" @alternar-favorito="alternarFavorito" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import ProductCard from './ProductCard.vue';

export default {
  name: 'ProductList',
  components: { ProductCard },
  computed: {
    ...mapState('productos', ['cargando', 'error']),
    ...mapState('filtros', ['categoria', 'busqueda']),
    ...mapGetters('productos', ['productosFiltrados', 'categorias']),
    ...mapGetters('favoritos', ['esFavorito'])
  },
  methods: {
    ...mapActions('productos', ['cargarProductos']),
    ...mapActions('filtros', ['seleccionarCategoria', 'buscar']),
    ...mapActions('favoritos', ['alternarFavorito'])
  },
  // Ciclo de vida: al montar la lista se piden los productos a la API (vía acción de Vuex).
  mounted() {
    this.cargarProductos();
  }
};
</script>
