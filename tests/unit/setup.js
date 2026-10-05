// Vuetify lee CSS.supports al importarse; jsdom no lo define
global.CSS = { supports: () => false };

// jsdom no trae ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};