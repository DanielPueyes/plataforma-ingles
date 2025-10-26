const letras = [
  { letra: "A", imagen: "assets/img/abecedario/A.png", sonido: "assets/audio/abecedario/A.wav" },
  { letra: "B", imagen: "assets/img/abecedario/B.png", sonido: "assets/audio/abecedario/B.wav" },
  { letra: "C", imagen: "assets/img/abecedario/C.png", sonido: "assets/audio/abecedario/C.wav" },
  { letra: "D", imagen: "assets/img/abecedario/D.png", sonido: "assets/audio/abecedario/D.wav" },
  { letra: "E", imagen: "assets/img/abecedario/E.png", sonido: "assets/audio/abecedario/E.wav" },
  { letra: "F", imagen: "assets/img/abecedario/F.png", sonido: "assets/audio/abecedario/F.wav" },
  { letra: "G", imagen: "assets/img/abecedario/G.png", sonido: "assets/audio/abecedario/G.wav" },
  { letra: "H", imagen: "assets/img/abecedario/H.png", sonido: "assets/audio/abecedario/H.wav" },
  { letra: "I", imagen: "assets/img/abecedario/I.png", sonido: "assets/audio/abecedario/I.wav" },
  { letra: "J", imagen: "assets/img/abecedario/J.png", sonido: "assets/audio/abecedario/J.wav" },
  { letra: "K", imagen: "assets/img/abecedario/K.png", sonido: "assets/audio/abecedario/K.wav" },
  { letra: "L", imagen: "assets/img/abecedario/L.png", sonido: "assets/audio/abecedario/L.wav" },
  { letra: "M", imagen: "assets/img/abecedario/M.png", sonido: "assets/audio/abecedario/M.wav" },
  { letra: "N", imagen: "assets/img/abecedario/N.png", sonido: "assets/audio/abecedario/N.wav" },
  { letra: "O", imagen: "assets/img/abecedario/O.png", sonido: "assets/audio/abecedario/O.wav" },
  { letra: "P", imagen: "assets/img/abecedario/P.png", sonido: "assets/audio/abecedario/P.wav" },
  { letra: "Q", imagen: "assets/img/abecedario/Q.png", sonido: "assets/audio/abecedario/Q.wav" },
  { letra: "R", imagen: "assets/img/abecedario/R.png", sonido: "assets/audio/abecedario/R.wav" },
  { letra: "S", imagen: "assets/img/abecedario/S.png", sonido: "assets/audio/abecedario/S.wav" },
  { letra: "T", imagen: "assets/img/abecedario/T.png", sonido: "assets/audio/abecedario/T.wav" },
  { letra: "U", imagen: "assets/img/abecedario/U.png", sonido: "assets/audio/abecedario/U.wav" },
  { letra: "V", imagen: "assets/img/abecedario/V.png", sonido: "assets/audio/abecedario/V.wav" },
  { letra: "W", imagen: "assets/img/abecedario/W.png", sonido: "assets/audio/abecedario/W.wav" },
  { letra: "X", imagen: "assets/img/abecedario/X.png", sonido: "assets/audio/abecedario/X.wav" },
  { letra: "Y", imagen: "assets/img/abecedario/Y.png", sonido: "assets/audio/abecedario/Y.wav" },
  { letra: "Z", imagen: "assets/img/abecedario/Z.png", sonido: "assets/audio/abecedario/Z.wav" },
];
const preguntaTexto = document.getElementById("texto-pregunta");
const imagenLetra = document.getElementById("imagen-letra");
const opcionesDiv = document.getElementById("opciones");
const resultado = document.getElementById("resultado");

let letraCorrecta = null;
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

  const indice = Math.floor(Math.random() * letras.length);
  letraCorrecta = letras[indice];

  imagenLetra.src = letraCorrecta.imagen;
  imagenLetra.alt = letraCorrecta.letra;

  // 🔊 Reproducir sonido
  reproducirSonido(letraCorrecta.sonido);

  // Repetir sonido al hacer clic
  imagenLetra.onclick = () => reproducirSonido(letraCorrecta.sonido);

  // Mezclar opciones
  const opcionesMezcladas = letras
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  if (!opcionesMezcladas.includes(letraCorrecta)) {
    opcionesMezcladas[Math.floor(Math.random() * 4)] = letraCorrecta;
  }

  opcionesDiv.innerHTML = "";
  opcionesMezcladas.forEach(letra => {
    const boton = document.createElement("button");
    boton.textContent = letra.letra;
    boton.classList.add("tarjeta");
    boton.onclick = () => verificarRespuesta(letra.letra);
    opcionesDiv.appendChild(boton);
  });
}

// ✅ Verificar respuesta
function verificarRespuesta(respuesta) {
  if (respuesta === letraCorrecta.letra) {
    resultado.textContent = "✅ Correct!";
    resultado.style.color = "green";
  } else {
    resultado.textContent = `❌ Wrong! It was ${letraCorrecta.letra}.`;
    resultado.style.color = "red";
  }

  setTimeout(generarPregunta, 2000);
}

// ▶️ Iniciar test
generarPregunta();
