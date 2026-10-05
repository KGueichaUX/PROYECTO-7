import { mount, flushPromises } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import ProductList from '@/components/ProductList.vue';
import { crearStore } from '@/store';
import * as api from '@/services/api';

jest.mock('@/services/api');

// Se registran los componentes para que se rendericen como en la app real
const vuetify = createVuetify({
  components,
  directives,
});

describe('ProductList - error de API', () => {
  it('muestra un mensaje de error visible cuando la API falla', async () => {
    api.obtenerProductos.mockRejectedValue(new Error('Network Error'));

    const wrapper = mount(ProductList, {
      global: {
        plugins: [crearStore(), vuetify],
      },
    });

    await flushPromises();

    const error = wrapper.find('[data-testid="estado-error"]');
    expect(error.exists()).toBe(true);
    expect(error.text()).toContain('No se pudieron cargar los productos');
    expect(wrapper.find('[data-testid="lista-productos"]').exists()).toBe(false);
  });
});