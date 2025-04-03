const productos = [
    { id: 1, nombre: "Teclado Gamer", precio: 50 },
    { id: 2, nombre: "Mouse Inalámbrico", precio: 30 },
    { id: 3, nombre: "Monitor 24", precio: 150 }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos() {
    const listaProductos = document.getElementById("lista-productos");
    listaProductos.innerHTML = "";
    productos.forEach(prod => {
        let item = document.createElement("div");
        item.innerHTML = `<p>${prod.nombre} - $${prod.precio} <button onclick="agregarAlCarrito(${prod.id})">Agregar</button></p>`;
        listaProductos.appendChild(item);
    });
}

function agregarAlCarrito(id) {
    let producto = productos.find(prod => prod.id === id);
    let itemEnCarrito = carrito.find(prod => prod.id === id);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total");
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach(prod => {
        let item = document.createElement("div");
        item.innerHTML = `<p>${prod.nombre} x${prod.cantidad} - $${prod.precio * prod.cantidad} <button onclick="eliminarDelCarrito(${prod.id})">Eliminar</button></p>`;
        listaCarrito.appendChild(item);
        total += prod.precio * prod.cantidad;
    });

    totalCarrito.textContent = `Total: $${total}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(prod => prod.id !== id);
    actualizarCarrito();
}

document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

mostrarProductos();
actualizarCarrito();
