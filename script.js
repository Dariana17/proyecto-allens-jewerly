const productos = [
  { id: 1, nombre: "Anillo doble brillo", precio: 6000, imagen: "/imagenes/anillo con brillante.jpg" },
  { id: 2, nombre: "Anillo ondulado", precio: 3000, imagen: "/imagenes/anillo.jpg" },
  { id: 3, nombre: "Cadena doble", precio: 10000, imagen: "/imagenes/cadena doble.jpg" },
  { id: 4, nombre: "Cadena cruz", precio: 8000, imagen: "/imagenes/Collar cruz.jpg" },
  { id: 5, nombre: "Cadena Sol", precio: 8500, imagen: "/imagenes/collar.jpg" },
  { id: 6, nombre: "Cadena serpiente", precio: 7000, imagen: "/imagenes/icon.jpg" },
  { id: 7, nombre: "Pendientes de Lazo", precio: 6000, imagen: "/imagenes/pendientes de lazo.jpg" },
  { id: 8, nombre: "Pendientes Redondos", precio: 9000, imagen: "/imagenes/pendientes redondos.jpg" },
  { id: 9, nombre: "Pulsera de Corazón", precio: 5000, imagen: "/imagenes/pulsera corazon.jpg" }
];

const contenedor = document.getElementById("contenedor-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const contadorCarrito = document.getElementById("contador-carrito");
const btnVaciar = document.getElementById("vaciar-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar productos
productos.forEach(producto => {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta-p");
  tarjeta.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <p>${producto.nombre}</p>
    <span>$${producto.precio} ARS</span>
    <button class="agregar-carrito" data-id="${producto.id}">🛒 Agregar</button>
  `;
  contenedor.appendChild(tarjeta);
});

// Escuchar clics
document.addEventListener("click", (e) => {
  // Agregar producto
  if (e.target.classList.contains("agregar-carrito")) {
    const id = parseInt(e.target.dataset.id);
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
  }

  // Eliminar producto
  if (e.target.classList.contains("eliminar-item")) {
    const index = parseInt(e.target.dataset.index);
    carrito.splice(index, 1);
    actualizarCarrito();
  }
});

// Vaciar carrito
btnVaciar.addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});

// Actualizar carrito visual
function actualizarCarrito() {
  listaCarrito.innerHTML = "";

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio} ARS 
      <button class="eliminar-item" data-index="${index}">❌</button>
    `;
    listaCarrito.appendChild(li);
  });

  const total = carrito.reduce((acum, prod) => acum + prod.precio, 0);
  totalCarrito.textContent = `Total: $${total} ARS`;
  contadorCarrito.textContent = carrito.length;

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Inicializar carrito al cargar la página
actualizarCarrito();
