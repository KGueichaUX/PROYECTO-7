const { defineConfig } = require('@vue/cli-service');
// Vuetify 3 se distribuye en ESM, por eso se transpila con el resto del código.
module.exports = defineConfig({ transpileDependencies: ['vuetify'] });
