const familia = [
  { nombre: "Mother", imagen: "assets/img/familia/Mother.png", sonido: "assets/audio/familia/mother.mp3" },
  { nombre: "Father", imagen: "assets/img/familia/Father.png", sonido: "assets/audio/familia/father.mp3" },
  { nombre: "Brother", imagen: "assets/img/familia/Brother.png", sonido: "assets/audio/familia/brother.mp3" },
  { nombre: "Sister", imagen: "assets/img/familia/Sister.png", sonido: "assets/audio/familia/sister.mp3" },
  { nombre: "Daughter", imagen: "assets/img/familia/Daughter.png", sonido: "assets/audio/familia/daughter.mp3" },
  { nombre: "Son", imagen: "assets/img/familia/Son.png", sonido: "assets/audio/familia/son.mp3" },
  { nombre: "Baby", imagen: "assets/img/familia/Baby.png", sonido: "assets/audio/familia/baby.mp3" },
  { nombre: "Grandmother", imagen: "assets/img/familia/Grandmother.png", sonido: "assets/audio/familia/grandmother.mp3" },
  { nombre: "Grandfather", imagen: "assets/img/familia/Grandfather.png", sonido: "assets/audio/familia/grandfather.mp3" },
  { nombre: "Granddaughter", imagen: "assets/img/familia/Granddaughter.png", sonido: "assets/audio/familia/granddaughter.mp3" },
  { nombre: "Grandson", imagen: "assets/img/familia/Grandson.png", sonido: "assets/audio/familia/grandson.mp3" },
  { nombre: "Aunt", imagen: "assets/img/familia/Aunt.png", sonido: "assets/audio/familia/aunt.mp3" },
  { nombre: "Uncle", imagen: "assets/img/familia/Uncle.png", sonido: "assets/audio/familia/uncle.mp3" },
  { nombre: "Cousin", imagen: "assets/img/familia/Cousin.png", sonido: "assets/audio/familia/cousin.mp3" }
];

const preguntaTexto = document.getElementById("texto-pregunta");
const imagenFamiliar = document.getElementById("imagen-familiar");
const opcionesDiv = document.getElementById("opciones");
const resultado = document.getElementById("resultado");

let familiarCorrecto = null;
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

  const indice = Math.floor(Math.random() * familia.length);
  familiarCorrecto = familia[indice];

  imagenFamiliar.src = familiarCorrecto.imagen;
  imagenFamiliar.alt = familiarCorrecto.nombre;

  // 🔊 Reproducir sonido del familiar mostrado
  reproducirSonido(familiarCorrecto.sonido);

  // Repetir sonido al hacer clic
  imagenFamiliar.onclick = () => reproducirSonido(familiarCorrecto.sonido);

  // Mezclar opciones
  const opcionesMezcladas = familia
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  if (!opcionesMezcladas.includes(familiarCorrecto)) {
    opcionesMezcladas[Math.floor(Math.random() * 4)] = familiarCorrecto;
  }

  opcionesDiv.innerHTML = "";
  opcionesMezcladas.forEach(persona => {
    const boton = document.createElement("button");
    boton.textContent = persona.nombre;
    boton.classList.add("tarjeta");
    boton.onclick = () => verificarRespuesta(persona.nombre);
    opcionesDiv.appendChild(boton);
  });
}

// ✅ Verificar respuesta
function verificarRespuesta(respuesta) {
  if (respuesta === familiarCorrecto.nombre) {
    resultado.textContent = "✅ Correct!";
    resultado.style.color = "green";
  } else {
    resultado.textContent = `❌ Wrong! It was ${familiarCorrecto.nombre}.`;
    resultado.style.color = "red";
  }

  setTimeout(generarPregunta, 2000);
}

// ▶️ Iniciar test
generarPregunta();
