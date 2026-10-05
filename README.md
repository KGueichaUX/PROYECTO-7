# TecnoMarket · Vue Product Showcase

SPA de catálogo interactivo de productos de tecnología para el Departamento de E-commerce de **TecnoMarket** (empresa ficticia). Proyecto del módulo 7: *Desarrollo de aplicaciones front-end con framework Vue*.

## Funcionalidades
- Catálogo consumido desde una API REST (JSON Server) con Axios.
- Estados de **carga**, **error** (con botón "Reintentar") y **vacío**.
- Filtro por categoría y búsqueda por nombre o marca.
- Detalle de cada producto, favoritos persistentes y contador en el encabezado.
- Diseño responsive y tema claro/oscuro (se recuerda la preferencia).

## Instalación y uso
Requisitos: Node.js 16 o superior.

```bash
npm install
npm run serve      # levanta la API (puerto 3001) y la app (http://localhost:8080)
```
Por separado: `npm run api` (solo la API) y `npm run serve:app` (solo la app). Para producción: `npm run build`.

## Pruebas
```bash
npm run test:unit        # 2 pruebas unitarias (Jest + Vue Test Utils)
npm run test:unit:coverage
npm run serve            # en una terminal...
npm run test:e2e         # ...y en otra: 1 prueba E2E con Cypress (o npm run cypress:open)
```
| Prueba | Archivo | Qué valida |
|---|---|---|
| Unitaria 1 | `tests/unit/ProductCard.spec.js` | Render correcto de `<ProductCard>` (nombre, marca, precio, stock, detalle) |
| Unitaria 2 | `tests/unit/ProductList.spec.js` | Respuesta visual ante un error de la API |
| E2E | `cypress/e2e/filtro.cy.js` | El usuario filtra por categoría y ve los resultados |

## Estructura
```
db.json                  API simulada (10 productos)
src/
  components/            AppHeader, AppFooter, ProductList, ProductCard
  store/                 index.js + modules/{productos,filtros,favoritos}.js
  services/api.js        Cliente Axios
  plugins/vuetify.js     Configuración de Vuetify y temas
tests/unit/              Pruebas unitarias
cypress/e2e/             Prueba end-to-end
```

## Justificaciones técnicas
| Decisión | Justificación |
|---|---|
| **Vue 3 + Vue CLI** | La consigna pide configurar el proyecto con Vue CLI. Se usa Vue 3 por ser la versión vigente y compatible con Vuetify 3 y Vuex 4. |
| **Options API** | Es la base que se enseña en el módulo, es legible para principiantes y `mapState/mapGetters/mapActions` simplifican la conexión con Vuex. En `AppHeader` se usa `setup()` porque `useTheme` de Vuetify lo requiere. |
| **Componentes** | `App`, `AppHeader`, `AppFooter`, `ProductList` y `ProductCard` tienen una sola responsabilidad. `ProductCard` es "tonta": recibe props y emite eventos, así se reutiliza y se prueba fácil. |
| **Ciclos de vida** | `mounted` en `ProductList` dispara la carga de datos; `mounted` en `ProductCard` ilustra el hook por tarjeta. |
| **Axios + JSON Server** | Axios maneja errores y timeouts de forma más clara que `fetch`. JSON Server entrega una API REST real sin construir un backend. La URL base se configura en `.env` (`VUE_APP_API_URL`). |
| **Servicio `api.js`** | Aísla las llamadas HTTP: si la API cambia, se modifica un solo archivo y las pruebas lo pueden simular con `jest.mock`. |
| **Vuex 4 con módulos** | `productos` (datos, carga, error), `filtros` (categoría y búsqueda) y `favoritos` (ids persistidos en `localStorage`). Todos con *namespace* para evitar choques de nombres y escalar. La llamada a la API vive en una **acción**; los cambios de estado, solo en **mutaciones**. |
| **Getters** | `productosFiltrados` combina datos y filtros sin duplicar estado; `categorias` se deriva de los productos, por lo que nuevas categorías aparecen sin tocar código. |
| **`crearStore()`** | Fábrica que permite un store limpio en cada prueba, evitando que un test contamine a otro. |
| **Jest + Vue Test Utils** | Estándar indicado en la consigna; ejecución rápida y aislada. Se usan atributos `data-testid` para que las pruebas no dependan de clases CSS. |
| **Cypress** | Prueba el flujo real en el navegador. Usa `cy.intercept` para simular la API y no depender de que JSON Server esté activo. |
| **Vuetify 3** | Biblioteca con componentes accesibles (roles ARIA, foco), grid responsive y sistema de temas claro/oscuro integrado, con lo que se cubren varios requisitos de la lección 5. |
| **Iconos MDI** | Los productos usan iconos en vez de fotos, para que el proyecto funcione sin conexión y sin depender de imágenes externas. |
| **Español** | Interfaz, mensajes de error, datos, pruebas y `lang="es"` en el HTML. Precios con `Intl.NumberFormat('es-CL')`. |
| **Accesibilidad** | Botones de icono con `aria-label`, encabezado `h1`, `<section>` etiquetada y estados comunicados con `v-alert`. |
| **Nuxt/Quasar (opcional)** | **No se migró.** La app es una SPA sin necesidad de SEO ni renderizado en servidor (Nuxt) ni de empaquetado móvil/escritorio inmediato (Quasar). Migrar añadiría complejidad sin beneficio hoy. Si el negocio necesita posicionamiento en buscadores, Nuxt sería el camino; si necesita app móvil o de escritorio, Quasar. Los componentes y el store se reutilizarían en ambos. |
| **`.gitignore`** | Excluye `node_modules/` y `.DS_Store` (además de `dist/`, `coverage/` y archivos de editor) para no subir archivos pesados o del sistema. |

## Mejoras futuras
Página de detalle con Vue Router, carrito de compras, paginación, imágenes reales y despliegue (Netlify/Vercel) con integración continua.

## Imágenes de productos
Cada producto de `db.json` tiene un campo `imagen` con la ruta de su archivo en `public/img/` (formato recomendado: JPG de 600 × 400 px, menos de 150 KB). Si el archivo todavía no existe, la tarjeta muestra el icono del producto como respaldo.
