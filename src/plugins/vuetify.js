import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// El tema elegido se recuerda entre visitas (claro por defecto).
const temaGuardado = localStorage.getItem('tema') || 'light';

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: temaGuardado,
    themes: {
      light: { colors: { primary: '#0B6E8A', secondary: '#E8590C' } },
      dark: { colors: { primary: '#4FC3E0', secondary: '#FF8A4C' } }
    }
  }
});
