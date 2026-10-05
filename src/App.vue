<template>
  <v-app>
    <AppHeader />
    <v-main>
      <v-container>
        <ProductList />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import ProductList from './components/ProductList.vue';

export default { name: 'App', components: { AppHeader, AppFooter, ProductList } };
</script>
