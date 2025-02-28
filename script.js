// 1. Declaración de variables y arrays
const productos = [
    { id: 1, nombre: "Teclado Gamer", precio: 50 },
    { id: 2, nombre: "Mouse Inalámbrico", precio: 30 },
    { id: 3, nombre: "Monitor 24\"", precio: 150 }
];

// Cargar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// 2. Función para mostrar productos disponibles
function mostrarProductos() {
    let mensaje = "Productos disponibles:\n" + 
        productos.map(prod => `${prod.id}. ${prod.nombre} - $${prod.precio}`).join("\n");
    alert(mensaje);
}

// 3. Función para agregar productos al carrito
function agregarAlCarrito() {
    let idProducto = parseInt(prompt("Ingrese el ID del producto que desea comprar:"));

    // Validación de entrada
    if (isNaN(idProducto) || !productos.some(prod => prod.id === idProducto)) {
        alert("ID inválido. Intente nuevamente.");
        return;
    }

    let productoEncontrado = productos.find(prod => prod.id === idProducto);
    let productoEnCarrito = carrito.find(prod => prod.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...productoEncontrado, cantidad: 1 });
    }

    alert(`${productoEncontrado.nombre} ha sido agregado al carrito.`);
    guardarCarrito();
}

// 4. Función para mostrar el carrito y total a pagar
function mostrarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let mensaje = "Carrito de compras:\n" + 
        carrito.map(prod => `- ${prod.nombre} (x${prod.cantidad}) - $${prod.precio * prod.cantidad}`).join("\n");
    
    let total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    mensaje += `\n\nTotal a pagar: $${total}`;
    alert(mensaje);
}

// 5. Función para eliminar un producto del carrito
function eliminarDelCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let idProducto = parseInt(prompt("Ingrese el ID del producto que desea eliminar:"));
    let productoEnCarrito = carrito.find(prod => prod.id === idProducto);

    if (!productoEnCarrito) {
        alert("El producto no está en el carrito.");
        return;
    }

    if (productoEnCarrito.cantidad > 1) {
        productoEnCarrito.cantidad--;
    } else {
        carrito = carrito.filter(prod => prod.id !== idProducto);
    }

    alert("Producto eliminado del carrito.");
    guardarCarrito();
}

// 6. Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// 7. Función principal para interactuar con el usuario
function iniciarSimulador() {
    let continuar = true;
    
    while (continuar) {
        let opcion = prompt("Seleccione una opción:\n1. Ver productos\n2. Agregar producto al carrito\n3. Ver carrito\n4. Eliminar producto del carrito\n5. Salir");
        
        switch (opcion) {
            case "1":
                mostrarProductos();
                break;
            case "2":
                agregarAlCarrito();
                break;
            case "3":
                mostrarCarrito();
                break;
            case "4":
                eliminarDelCarrito();
                break;
            case "5":
                alert("Gracias por usar nuestra tienda en línea.");
                continuar = false;
                break;
            default:
                alert("Opción inválida. Intente de nuevo.");
        }
    }
}

iniciarSimulador();
