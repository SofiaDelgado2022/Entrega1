let nombreJugador = "";
let puntosUsuario = 0;
let puntosPC = 0;
let numeroRonda = 1; 

let contenedorPuntosUsuario = document.querySelector("#puntos-usuario");
let contenedorPuntosPC = document.querySelector("#puntos-computadora");
let mensaje = document.querySelector("#mensaje");
let contenedorGanaPunto = document.querySelector("#gana-punto");
let herramienta = document.querySelector("#elegi-herramienta");

let contenedorEleccionUsuario = document.querySelector("#eleccion-usuario");
let contenedorEleccionPC = document.querySelector("#eleccion-computadora");

let game = document.querySelector(".game");
let login = document.querySelector(".login");

let reiniciar = document.querySelector(".reset-btn");

let botonesArmas = document.querySelectorAll(".arma");
botonesArmas.forEach(boton => {
    boton.addEventListener("click", iniciarTurno);
});



document.addEventListener("DOMContentLoaded", function () {
    let formNombreJugador = document.getElementById("formNombreJugador");

    formNombreJugador.addEventListener("submit", function (event) {
        event.preventDefault();
        nombreJugador = document.getElementById("nombre-jugador").value;
        mostrarSeccionJuego();
        iniciarTurno();
    });
});

function mostrarSeccionJuego() {
    login.style.display = "none";
    game.style.display = "block";
}



function iniciarTurno(e) {

    game.classList.remove("disabled");

    document.querySelector(".nombre-jugador").innerText = nombreJugador;


    let eleccionPC = Math.floor(Math.random() * 3);
    let eleccionUsuario = e.currentTarget.id;

    let tabla = document.querySelector('table tbody');
    let nuevaFila = tabla.insertRow();
    let celdaRonda = nuevaFila.insertCell(0);
    let celdaResultado = nuevaFila.insertCell(1);

celdaRonda.textContent = numeroRonda; 


    let resultadoRonda;

    if (eleccionPC === 0) {
        eleccionPC = "piedra";
    } else if (eleccionPC === 1) {
        eleccionPC = "papel"
    } else if (eleccionPC === 2) {
        eleccionPC = "tijera"
    }


    if (
        (eleccionUsuario === "piedra" && eleccionPC === "tijera") ||
        (eleccionUsuario === "tijera" && eleccionPC === "papel") ||
        (eleccionUsuario === "papel" && eleccionPC === "piedra")
    ) {
        resultadoRonda = nombreJugador;
        ganaUsuario();
    } else if (
        (eleccionPC === "piedra" && eleccionUsuario === "tijera") ||
        (eleccionPC === "tijera" && eleccionUsuario === "papel") ||
        (eleccionPC === "papel" && eleccionUsuario === "piedra")
    ) {
        resultadoRonda = "Computadora";
        ganaPC();
    } else {
        resultadoRonda = "Empate";
        empate();
    }

    celdaResultado.textContent = resultadoRonda;
    numeroRonda++;

    mensaje.classList.remove("disabled");
    contenedorEleccionUsuario.innerText = eleccionUsuario;
    contenedorEleccionPC.innerText = eleccionPC;

    if (puntosUsuario === 5 || puntosPC === 5) {
        if (puntosUsuario === 5) {
            mostrarResultadoJuego("¡Ganaste el juego!");
        }

        if (puntosPC === 5) {
            mostrarResultadoJuego("¡La computadora ganó el juego!");
        }

        herramienta.classList.add("disabled");
        reiniciar.classList.remove("disabled");
        reiniciar.addEventListener("click", reiniciarJuego);
    }


}

function mostrarResultadoJuego(resultado) {
    mensaje.classList.remove("disabled");
    contenedorGanaPunto.innerText = resultado;
}

function ganaUsuario() {
    puntosUsuario++;
    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorGanaPunto.innerText = "¡Ganaste un punto! "
}

function ganaPC() {
    puntosPC++;
    contenedorPuntosPC.innerText = puntosPC;
    contenedorGanaPunto.innerText = "¡La computadora ganó un punto! "
}

function empate() {
    contenedorGanaPunto.innerText = "¡Empate!"
}



// Función para abrir el modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

// Función para cerrar el modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function reiniciarJuego() {
    reiniciar.classList.add("disabled");
    herramienta.classList.remove("disabled");
    mensaje.classList.add("disabled");

    puntosUsuario = 0;
    puntosPC = 0;

    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorPuntosPC.innerText = puntosPC;

    let tabla = document.querySelector('table tbody');
    tabla.innerHTML = '';

    contenedorEleccionUsuario.innerText = "";
    contenedorEleccionPC.innerText = "";

    login.style.display = "flex";
    document.getElementById("nombre-jugador").value = "";
    game.style.display = "none";

}