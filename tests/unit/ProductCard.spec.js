import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import ProductCard from '@/components/ProductCard.vue';

const vuetify = createVuetify({
  components,
  directives,
});

const producto = {
  id: 1,
  nombre: 'Laptop UltraBook 14',
  categoria: 'Laptops',
  marca: 'NovaTech',
  precio: 899990,
  descripcion: 'Ultraportátil de 14".',
  icono: 'mdi-laptop',
  stock: 12,
};

const montar = (props = {}) =>
  mount(ProductCard, {
    props: { producto, ...props },
    global: { plugins: [vuetify] },
  });

describe('ProductCard', () => {
  it('muestra correctamente los datos del producto', () => {
    const wrapper = montar();

    expect(wrapper.get('[data-testid="nombre-producto"]').text()).toBe('Laptop UltraBook 14');
    expect(wrapper.text()).toContain('NovaTech');
    expect(wrapper.text()).toContain('Laptops');
    expect(wrapper.get('[data-testid="precio-producto"]').text()).toMatch(/899\.990/);
    expect(wrapper.text()).toContain('12 unidades disponibles');
    expect(wrapper.find('[data-testid="detalle-producto"]').exists()).toBe(false);
  });

  it('muestra y oculta el detalle al hacer clic en el botón', async () => {
    const wrapper = montar();
    const boton = wrapper.get('[data-testid="boton-detalles"]');

    expect(boton.text()).toBe('Ver detalles');

    await boton.trigger('click');
    expect(wrapper.find('[data-testid="detalle-producto"]').exists()).toBe(true);
    expect(wrapper.get('[data-testid="detalle-producto"]').text()).toBe('Ultraportátil de 14".');
    expect(boton.text()).toBe('Ocultar detalles');

    await boton.trigger('click');
    expect(wrapper.find('[data-testid="detalle-producto"]').exists()).toBe(false);
  });

  it('muestra "Sin stock" cuando el stock es 0', () => {
    const wrapper = montar({ producto: { ...producto, stock: 0 } });

    expect(wrapper.text()).toContain('Sin stock');
    expect(wrapper.text()).not.toContain('unidades disponibles');
  });

  it('emite alternar-favorito con el id al hacer clic en el corazón', async () => {
    const wrapper = montar();

    await wrapper.get('[data-testid="boton-favorito"]').trigger('click');

    expect(wrapper.emitted('alternar-favorito')).toEqual([[1]]);
  });
});