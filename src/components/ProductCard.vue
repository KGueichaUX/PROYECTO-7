<template>
  <v-card class="h-100 d-flex flex-column" data-testid="tarjeta-producto" variant="outlined">
    <v-img
      v-if="producto.imagen"
      :src="producto.imagen"
      :alt="`Imagen de ${producto.nombre}`"
      height="200"
      cover
      class="bg-surface-variant"
    >
      <!-- Si el archivo aún no existe, se muestra el icono del producto -->
      <template #error>
        <div class="d-flex align-center justify-center fill-height">
          <v-icon :icon="producto.icono" size="72" color="primary" />
        </div>
      </template>
    </v-img>
    <div v-else class="d-flex align-center justify-center py-6 bg-surface-variant">
      <v-icon :icon="producto.icono" size="72" color="primary" />
    </div>
    <v-card-item>
      <v-card-title class="text-wrap" data-testid="nombre-producto">{{ producto.nombre }}</v-card-title>
      <v-card-subtitle>{{ producto.marca }}</v-card-subtitle>
      <template #append>
        <v-btn
          :icon="esFavorito ? 'mdi-heart' : 'mdi-heart-outline'"
          :color="esFavorito ? 'secondary' : undefined"
          :aria-label="esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'"
          variant="text"
          data-testid="boton-favorito"
          @click="$emit('alternar-favorito', producto.id)"
        />
      </template>
    </v-card-item>
    <v-card-text class="flex-grow-1">
      <v-chip size="small" color="primary" class="mb-2">{{ producto.categoria }}</v-chip>
      <div class="text-h6" data-testid="precio-producto">{{ precioFormateado }}</div>
      <div :class="sinStock ? 'text-error' : 'text-success'" class="text-body-2">
        {{ sinStock ? 'Sin stock' : `${producto.stock} unidades disponibles` }}
      </div>
      <v-expand-transition>
        <p v-if="verDetalle" class="mt-3 text-body-2" data-testid="detalle-producto">{{ producto.descripcion }}</p>
      </v-expand-transition>
    </v-card-text>
    <v-card-actions>
      <v-btn
       variant="tonal"
       color="primary"
       block
       data-testid="boton-detalles"
       @click="verDetalle = !verDetalle"
      >
        {{ verDetalle ? 'Ocultar detalles' : 'Ver detalles' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    producto: { type: Object, required: true },
    esFavorito: { type: Boolean, default: false }
  },
  emits: ['alternar-favorito'],
  data: () => ({ verDetalle: false }),
  computed: {
    sinStock() { return this.producto.stock === 0; },
    precioFormateado() {
      return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })
        .format(this.producto.precio);
    }
  },
  // Ciclo de vida: se ejecuta al montar cada tarjeta (útil para registrar métricas, animaciones, etc.).
  mounted() {
    if (process.env.NODE_ENV === 'development') console.debug(`[ProductCard] montada: ${this.producto.nombre}`);
  }
};
</script>
