// Obtener el carrito almacenado en localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    const productoExistente = carrito.find(producto => producto.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad++;
        // Disparar evento cantidadModificada
        document.dispatchEvent(new CustomEvent('cantidadModificada', { detail: { producto: productoExistente } }));
    } else {
        const nuevoProducto = { nombre, precio, imagen, cantidad: 1 };
        carrito.push(nuevoProducto);
        // Disparar evento productoAgregado
        document.dispatchEvent(new CustomEvent('productoAgregado', { detail: { producto: nuevoProducto } }));
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarIconoCarrito();
    mostrarCarrito();
}

// Función para mostrar el carrito en el modal o contenedor del carrito
function mostrarCarrito() {
    const carritoContainer = document.getElementById("carrito");
    const totalElement = document.getElementById("total");

    carritoContainer.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="${producto.imagen}" alt="${producto.nombre}" width="50"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>
                <button onclick="modificarCantidad('${producto.nombre}', 1)">+</button>
                ${producto.cantidad}
                <button onclick="modificarCantidad('${producto.nombre}', -1)">-</button>
            </td>
            <td><button onclick="eliminarDelCarrito('${producto.nombre}')">Eliminar</button></td>
        `;
        carritoContainer.appendChild(fila);
        total += producto.precio * producto.cantidad;
    });

    totalElement.textContent = `Total: $${total}`;
}

// Función para modificar la cantidad de un producto en el carrito
function modificarCantidad(nombre, cambio) {
    const producto = carrito.find(producto => producto.nombre === nombre);
    
    if (producto) {
        producto.cantidad += cambio;

        // Si la cantidad es menor o igual a 0, eliminamos el producto
        if (producto.cantidad <= 0) {
            eliminarDelCarrito(nombre);
        } else {
            // Disparar evento cantidadModificada
            document.dispatchEvent(new CustomEvent('cantidadModificada', { detail: { producto } }));
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
        actualizarIconoCarrito();
    }
}

// Función para actualizar el icono del carrito con la cantidad de productos
function actualizarIconoCarrito() {
    const cartCount = document.getElementById("cart-count");
    const totalProductos = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
    cartCount.textContent = `(${totalProductos})`;
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(nombre) {
    const productoEliminado = carrito.find(producto => producto.nombre === nombre);
    carrito = carrito.filter(producto => producto.nombre !== nombre);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    actualizarIconoCarrito();

    // Disparar evento productoEliminado
    document.dispatchEvent(new CustomEvent('productoEliminado', { detail: { producto: productoEliminado } }));
}

// Mostrar el carrito cuando la página se carga
window.onload = function() {
    mostrarCarrito();
    actualizarIconoCarrito();
}

// Escuchar eventos personalizados
document.addEventListener('productoAgregado', function(e) {
    console.log(`Producto agregado: ${e.detail.producto.nombre}`);
});

document.addEventListener('cantidadModificada', function(e) {
    console.log(`Cantidad modificada para el producto: ${e.detail.producto.nombre}, nueva cantidad: ${e.detail.producto.cantidad}`);
});

document.addEventListener('productoEliminado', function(e) {
    console.log(`Producto eliminado: ${e.detail.producto.nombre}`);
});
