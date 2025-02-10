// 1. Declaración de variables y arrays
const productos = [
    { id: 1, nombre: "Teclado Gamer", precio: 50 },
    { id: 2, nombre: "Mouse Inalámbrico", precio: 30 },
    { id: 3, nombre: "Monitor 24" , precio: 150 }
];

let carrito = [];

// 2. Función para mostrar productos disponibles
function mostrarProductos() {
    let mensaje = "Productos disponibles:\n";
    productos.forEach(prod => {
        mensaje += `${prod.id}. ${prod.nombre} - $${prod.precio}\n`;
    });
    alert(mensaje);
}

// 3. Función para agregar productos al carrito
function agregarAlCarrito() {
    let idProducto = parseInt(prompt("Ingrese el ID del producto que desea comprar:"));
    let productoEncontrado = productos.find(prod => prod.id === idProducto);
    
    if (productoEncontrado) {
        carrito.push(productoEncontrado);
        alert(`${productoEncontrado.nombre} ha sido agregado al carrito.`);
    } else {
        alert("Producto no encontrado. Intente nuevamente.");
    }
}

// 4. Función para mostrar el carrito y total a pagar
function mostrarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    
    let mensaje = "Carrito de compras:\n";
    let total = 0;
    
    carrito.forEach(prod => {
        mensaje += `- ${prod.nombre} - $${prod.precio}\n`;
        total += prod.precio;
    });
    
    mensaje += `\nTotal a pagar: $${total}`;
    alert(mensaje);
}

// 5. Función principal para interactuar con el usuario
function iniciarSimulador() {
    let continuar = true;
    
    while (continuar) {
        let opcion = prompt("Seleccione una opción:\n1. Ver productos\n2. Agregar producto al carrito\n3. Ver carrito\n4. Salir");
        
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
                alert("Gracias por usar nuestra tienda en línea.");
                continuar = false;
                break;
            default:
                alert("Opción inválida. Intente de nuevo.");
        }
    }
}

iniciarSimulador();
