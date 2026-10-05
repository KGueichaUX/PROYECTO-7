// Se simula la API con cy.intercept para que la prueba no dependa de json-server.
const productos = [
  { id: 1, nombre: 'Laptop UltraBook 14', categoria: 'Laptops', marca: 'NovaTech', precio: 899990, descripcion: 'x', icono: 'mdi-laptop', stock: 12 },
  { id: 2, nombre: 'Audífonos Silence ANC', categoria: 'Audio', marca: 'Sonara', precio: 189990, descripcion: 'x', icono: 'mdi-headphones', stock: 18 },
  { id: 3, nombre: 'Parlante Bocinex Go', categoria: 'Audio', marca: 'Sonara', precio: 79990, descripcion: 'x', icono: 'mdi-speaker', stock: 40 }
];

describe('Filtro de productos', () => {
  it('el usuario filtra por categoría y ve solo los resultados correspondientes', () => {
    cy.intercept('GET', '**/productos', productos).as('productos');
    cy.visit('/');
    cy.wait('@productos');

    cy.get('[data-testid="tarjeta-producto"]').should('have.length', 3);

    cy.get('[data-testid="filtro-categorias"]').contains('Audio').click();
    cy.get('[data-testid="tarjeta-producto"]').should('have.length', 2);
    cy.contains('Audífonos Silence ANC').should('be.visible');
    cy.contains('Laptop UltraBook 14').should('not.exist');
  });
});
