let inventario = {
    monitor: 0,
    teclado: 0,
    mouse: 0,
    mousepad: 0,
    audifonos: 0
};

let accionActual = "";
let productoActual = "";

// CAMBIO DE PANTALLAS
function mostrarPantalla(id) {
    document.querySelectorAll(".screen").forEach(p => {
        p.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

// LOGIN
function login() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    let error = document.getElementById("loginError");

    if (user === "admin1" && pass === "123456") {
        mostrarPantalla("stockScreen");
    } else {
        error.innerHTML = "Usuario o contraseña incorrectos";
    }
}

// GUARDAR STOCK
function guardarStock() {
    inventario.monitor = parseInt(document.getElementById("monitor").value) || 0;
    inventario.teclado = parseInt(document.getElementById("teclado").value) || 0;
    inventario.mouse = parseInt(document.getElementById("mouse").value) || 0;
    inventario.mousepad = parseInt(document.getElementById("mousepad").value) || 0;
    inventario.audifonos = parseInt(document.getElementById("audifonos").value) || 0;

    mostrarPantalla("menuScreen");
    mostrarInventario();
}

// MODAL VENTA
function abrirModalVenta(producto) {

    accionActual = "venta";
    productoActual = producto;

    document.getElementById("modalTitulo").innerHTML =
        "Vender " + producto.toUpperCase();

    document.getElementById("productoSelect").style.display = "none";

    document.getElementById("cantidadModal").value = "";

    document.getElementById("modal").classList.add("active");
}

// MODAL REABASTECER
function abrirModalReabastecer() {

    accionActual = "reabastecer";

    document.getElementById("modalTitulo").innerHTML =
        "Reabastecer Producto";

    document.getElementById("productoSelect").style.display = "block";
    document.getElementById("cantidadModal").value = "";

    document.getElementById("modal").classList.add("active");
}

// CERRAR MODAL
function cerrarModal() {
    document.getElementById("modal").classList.remove("active");
}

// CONFIRMAR ACCION
function confirmarAccion() {

    let cantidad = parseInt(document.getElementById("cantidadModal").value);

    if (isNaN(cantidad) || cantidad <= 0) return;

    if (accionActual === "reabastecer") {
        productoActual = document.getElementById("productoSelect").value;
    }

    if (accionActual === "venta") {

        if (inventario[productoActual] >= cantidad) {

            inventario[productoActual] -= cantidad;

            let mensaje =
                "Venta realizada de " + cantidad + " " + productoActual +
                "<br>Stock restante: " + inventario[productoActual];

            if (inventario[productoActual] < 3) {
                mensaje += "<br><span style='color:red'>ALERTA: Stock crítico</span>";
            }

            document.getElementById("resultado").innerHTML = mensaje;

        } else {
            document.getElementById("resultado").innerHTML =
                "<span style='color:red'>Stock insuficiente</span>";
        }

    } else {

        inventario[productoActual] += cantidad;

        document.getElementById("resultado").innerHTML =
            "Se agregaron " + cantidad + " unidades de " + productoActual +
            "<br>Nuevo stock: " + inventario[productoActual];
    }

    cerrarModal();
}

// VER INVENTARIO
function mostrarInventario() {

    document.getElementById("resultado").innerHTML = `
        <h2 style="color:#00ffff;">Inventario Actual</h2><br>

        Monitores: ${inventario.monitor}<br>
        Teclados: ${inventario.teclado}<br>
        Mouse: ${inventario.mouse}<br>
        Mousepad: ${inventario.mousepad}<br>
        Audífonos: ${inventario.audifonos}
    `;
}

// SALIR
function salir() {
    location.reload();
}