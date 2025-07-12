const contenedor = document.getElementById("contenedor-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const contadorCarrito = document.getElementById("contador-carrito");
const btnVaciar = document.getElementById("vaciar-carrito");
const botonCompra = document.getElementById("realizar-compra");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Productos desde el archivo JSON local
fetch("data/productos.json")
  .then((res) => res.json())
  .then((productos) => {
    mostrarProductos(productos);

    // Clics para agregar al carrito
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("agregar-carrito")) {
        const id = parseInt(e.target.dataset.id);
        const producto = productos.find(p => p.id === id);
        agregarAlCarrito(producto);
      }

      if (e.target.classList.contains("eliminar-item")) {
        const id = parseInt(e.target.dataset.id);
        eliminarDelCarrito(id);
      }
    });
  });

// Mostrar productos en el DOM
function mostrarProductos(productos) {
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
}

function agregarAlCarrito(producto) {
  const itemExistente = carrito.find(item => item.id === producto.id);
  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  actualizarCarrito();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  actualizarCarrito();
}

btnVaciar.addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});

botonCompra.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  alert("¡Gracias por tu compra!");
  carrito = [];
  actualizarCarrito();
});

function actualizarCarrito() {
  listaCarrito.innerHTML = "";

  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio} x ${item.cantidad}
      <button class="eliminar-item" data-id="${item.id}">❌</button>
    `;
    listaCarrito.appendChild(li);

    total += item.precio * item.cantidad;
    cantidadTotal += item.cantidad;
  });

  totalCarrito.textContent = `Total: $${total} ARS`;
  contadorCarrito.textContent = cantidadTotal;

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar carrito al iniciar
actualizarCarrito();