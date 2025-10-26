const partesCuerpo = [
  { nombre: "Head", imagen: "assets/img/partes/Head.png", sonido: "assets/audio/partes/Head.mp3" },
  { nombre: "Eye", imagen: "assets/img/partes/Eye.png", sonido: "assets/audio/partes/Eye.mp3" },
  { nombre: "Ear", imagen: "assets/img/partes/Ear.png", sonido: "assets/audio/partes/Ear.mp3" },
  { nombre: "Arm", imagen: "assets/img/partes/Arm.png", sonido: "assets/audio/partes/Arm.mp3" },
  { nombre: "Hand", imagen: "assets/img/partes/Hand.png", sonido: "assets/audio/partes/Hand.mp3" },
  { nombre: "Leg", imagen: "assets/img/partes/Leg.png", sonido: "assets/audio/partes/Leg.mp3" },
  { nombre: "Eyebrow", imagen: "assets/img/partes/Eyebrow.png", sonido: "assets/audio/partes/Eyebrow.mp3" },
  { nombre: "Nose", imagen: "assets/img/partes/Nose.png", sonido: "assets/audio/partes/Nose.mp3" },
  { nombre: "Lip", imagen: "assets/img/partes/Lip.png", sonido: "assets/audio/partes/Lip.mp3" },
  { nombre: "Mouth", imagen: "assets/img/partes/Mouth.png", sonido: "assets/audio/partes/Mouth.mp3" },
  { nombre: "Tongue", imagen: "assets/img/partes/Tongue.png", sonido: "assets/audio/partes/Tongue.mp3" },
  { nombre: "Foot", imagen: "assets/img/partes/Foot.png", sonido: "assets/audio/partes/Foot.mp3" },
  { nombre: "Shoulder", imagen: "assets/img/partes/Shoulder.png", sonido: "assets/audio/partes/Shoulder.mp3" },
  { nombre: "Knee", imagen: "assets/img/partes/Knee.png", sonido: "assets/audio/partes/Knee.mp3" }
];

const preguntaTexto = document.getElementById("texto-pregunta");
const imagenParte = document.getElementById("imagen-parte");
const opcionesDiv = document.getElementById("opciones");
const resultado = document.getElementById("resultado");

let parteCorrecta = null;
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

  const indice = Math.floor(Math.random() * partesCuerpo.length);
  parteCorrecta = partesCuerpo[indice];

  imagenParte.src = parteCorrecta.imagen;
  imagenParte.alt = parteCorrecta.nombre;

  // 🔊 Reproducir sonido de la parte mostrada
  reproducirSonido(parteCorrecta.sonido);

  // Repetir sonido al hacer clic
  imagenParte.onclick = () => reproducirSonido(parteCorrecta.sonido);

  // Mezclar opciones
  const opcionesMezcladas = partesCuerpo
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  if (!opcionesMezcladas.includes(parteCorrecta)) {
    opcionesMezcladas[Math.floor(Math.random() * 4)] = parteCorrecta;
  }

  opcionesDiv.innerHTML = "";
  opcionesMezcladas.forEach(parte => {
    const boton = document.createElement("button");
    boton.textContent = parte.nombre;
    boton.classList.add("tarjeta");
    boton.onclick = () => verificarRespuesta(parte.nombre);
    opcionesDiv.appendChild(boton);
  });
}

// ✅ Verificar respuesta
function verificarRespuesta(respuesta) {
  if (respuesta === parteCorrecta.nombre) {
    resultado.textContent = "✅ Correct!";
    resultado.style.color = "green";
  } else {
    resultado.textContent = `❌ Wrong! It was ${parteCorrecta.nombre}.`;
    resultado.style.color = "red";
  }

  setTimeout(generarPregunta, 2000);
}

// ▶️ Iniciar test
generarPregunta();
