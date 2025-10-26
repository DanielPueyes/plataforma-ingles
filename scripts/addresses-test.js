const direcciones = [
  { nombre: "On the left", imagen: "assets/img/direcciones/on the left.png", sonido: "assets/audio/direcciones/on_the_left.mp3" },
  { nombre: "On the right", imagen: "assets/img/direcciones/on the right.png", sonido: "assets/audio/direcciones/on_the_right.mp3" },
  { nombre: "Across from", imagen: "assets/img/direcciones/across from.png", sonido: "assets/audio/direcciones/across_from.mp3" },
  { nombre: "Under", imagen: "assets/img/direcciones/under.png", sonido: "assets/audio/direcciones/under.mp3" },
  { nombre: "On", imagen: "assets/img/direcciones/on.png", sonido: "assets/audio/direcciones/on.mp3" },
  { nombre: "Inside", imagen: "assets/img/direcciones/inside.png", sonido: "assets/audio/direcciones/inside.mp3" },
  { nombre: "Outside", imagen: "assets/img/direcciones/outside.png", sonido: "assets/audio/direcciones/outside.mp3" },
  { nombre: "In front of", imagen: "assets/img/direcciones/in front of.png", sonido: "assets/audio/direcciones/in_front_of.mp3" },
  { nombre: "Behind", imagen: "assets/img/direcciones/behind.png", sonido: "assets/audio/direcciones/behind.mp3" },
  { nombre: "Next to", imagen: "assets/img/direcciones/next to.png", sonido: "assets/audio/direcciones/next_to.mp3" },
  { nombre: "Between", imagen: "assets/img/direcciones/between.png", sonido: "assets/audio/direcciones/between.mp3" },
  { nombre: "Among", imagen: "assets/img/direcciones/among.png", sonido: "assets/audio/direcciones/among.mp3" },
  { nombre: "Around", imagen: "assets/img/direcciones/around.png", sonido: "assets/audio/direcciones/around.mp3" },
  { nombre: "Above", imagen: "assets/img/direcciones/above.png", sonido: "assets/audio/direcciones/above.mp3" }
];

const preguntaTexto = document.getElementById("texto-pregunta");
const imagenDireccion = document.getElementById("imagen-addresses");
const opcionesDiv = document.getElementById("opciones");
const resultado = document.getElementById("resultado");

let direccionCorrecta = null;
let audioActual = null;

// 🔊 Reproducir sonido
function reproducirSonido(ruta) {
  if (audioActual) {
    audioActual.pause();
    audioActual.currentTime = 0;
  }
  audioActual = new Audio(ruta);
  audioActual.play();
}

// 🧩 Generar nueva pregunta
function generarPregunta() {
  resultado.textContent = "";

  const indice = Math.floor(Math.random() * direcciones.length);
  direccionCorrecta = direcciones[indice];

  imagenDireccion.src = direccionCorrecta.imagen;
  imagenDireccion.alt = direccionCorrecta.nombre;

  // 🔊 Reproducir sonido de la dirección mostrada
  reproducirSonido(direccionCorrecta.sonido);

  // Repetir sonido al hacer clic
  imagenDireccion.onclick = () => reproducirSonido(direccionCorrecta.sonido);

  // Mezclar opciones
  const opcionesMezcladas = direcciones
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  if (!opcionesMezcladas.includes(direccionCorrecta)) {
    opcionesMezcladas[Math.floor(Math.random() * 4)] = direccionCorrecta;
  }

  opcionesDiv.innerHTML = "";
  opcionesMezcladas.forEach(item => {
    const boton = document.createElement("button");
    boton.textContent = item.nombre;
    boton.classList.add("tarjeta");
    boton.onclick = () => verificarRespuesta(item.nombre);
    opcionesDiv.appendChild(boton);
  });
}

// ✅ Verificar respuesta
function verificarRespuesta(respuesta) {
  if (respuesta === direccionCorrecta.nombre) {
    resultado.textContent = "✅ Correct!";
    resultado.style.color = "green";
  } else {
    resultado.textContent = `❌ Wrong! It was ${direccionCorrecta.nombre}.`;
    resultado.style.color = "red";
  }

  setTimeout(generarPregunta, 2000);
}

// ▶️ Iniciar test
generarPregunta();
