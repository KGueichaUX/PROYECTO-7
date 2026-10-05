<template>
  <v-footer class="justify-center text-body-2" border>
    © {{ anio }} TecnoMarket
  </v-footer>
</template>

<script>
export default { name: 'AppFooter', data: () => ({ anio: new Date().getFullYear() }) };
</script>
