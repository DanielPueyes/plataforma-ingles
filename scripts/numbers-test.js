const numeros = [
  { numero: "0", imagen: "assets/img/numeros/0.png", sonido: "assets/audio/numeros/0.wav" },
  { numero: "1", imagen: "assets/img/numeros/1.png", sonido: "assets/audio/numeros/1.wav" },
  { numero: "2", imagen: "assets/img/numeros/2.png", sonido: "assets/audio/numeros/2.wav" },
  { numero: "3", imagen: "assets/img/numeros/3.png", sonido: "assets/audio/numeros/3.wav" },
  { numero: "4", imagen: "assets/img/numeros/4.png", sonido: "assets/audio/numeros/4.wav" },
  { numero: "5", imagen: "assets/img/numeros/5.png", sonido: "assets/audio/numeros/5.wav" },
  { numero: "6", imagen: "assets/img/numeros/6.png", sonido: "assets/audio/numeros/6.wav" },
  { numero: "7", imagen: "assets/img/numeros/7.png", sonido: "assets/audio/numeros/7.wav" },
  { numero: "8", imagen: "assets/img/numeros/8.png", sonido: "assets/audio/numeros/8.wav" },
  { numero: "9", imagen: "assets/img/numeros/9.png", sonido: "assets/audio/numeros/9.wav" },
  { numero: "10", imagen: "assets/img/numeros/10.png", sonido: "assets/audio/numeros/10.wav" },
  { numero: "11", imagen: "assets/img/numeros/11.png", sonido: "assets/audio/numeros/11.wav" },
  { numero: "12", imagen: "assets/img/numeros/12.png", sonido: "assets/audio/numeros/12.wav" },
  { numero: "13", imagen: "assets/img/numeros/13.png", sonido: "assets/audio/numeros/13.wav" },
  { numero: "14", imagen: "assets/img/numeros/14.png", sonido: "assets/audio/numeros/14.wav" },
  { numero: "15", imagen: "assets/img/numeros/15.png", sonido: "assets/audio/numeros/15.wav" },
  { numero: "16", imagen: "assets/img/numeros/16.png", sonido: "assets/audio/numeros/16.wav" },
  { numero: "17", imagen: "assets/img/numeros/17.png", sonido: "assets/audio/numeros/17.wav" },
  { numero: "18", imagen: "assets/img/numeros/18.png", sonido: "assets/audio/numeros/18.wav" },
  { numero: "19", imagen: "assets/img/numeros/19.png", sonido: "assets/audio/numeros/19.wav" },
  { numero: "20", imagen: "assets/img/numeros/20.png", sonido: "assets/audio/numeros/20.wav" },
  { numero: "30", imagen: "assets/img/numeros/30.png", sonido: "assets/audio/numeros/30.wav" },
  { numero: "40", imagen: "assets/img/numeros/40.png", sonido: "assets/audio/numeros/40.wav" },
  { numero: "50", imagen: "assets/img/numeros/50.png", sonido: "assets/audio/numeros/50.wav" },
  { numero: "60", imagen: "assets/img/numeros/60.png", sonido: "assets/audio/numeros/60.wav" },
  { numero: "70", imagen: "assets/img/numeros/70.png", sonido: "assets/audio/numeros/70.wav" },
  { numero: "80", imagen: "assets/img/numeros/80.png", sonido: "assets/audio/numeros/80.wav" },
  { numero: "90", imagen: "assets/img/numeros/90.png", sonido: "assets/audio/numeros/90.wav" },
  { numero: "100", imagen: "assets/img/numeros/100.png", sonido: "assets/audio/numeros/100.wav" }
];

const preguntaTexto = document.getElementById("texto-pregunta");
const imagenNumero = document.getElementById("imagen-numero");
const opcionesDiv = document.getElementById("opciones");
const resultado = document.getElementById("resultado");

let numeroCorrecto = null;
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

  const indice = Math.floor(Math.random() * numeros.length);
  numeroCorrecto = numeros[indice];

  imagenNumero.src = numeroCorrecto.imagen;
  imagenNumero.alt = numeroCorrecto.numero;

  // 🔊 Reproducir sonido del número mostrado
  reproducirSonido(numeroCorrecto.sonido);

  // Repetir sonido al hacer clic
  imagenNumero.onclick = () => reproducirSonido(numeroCorrecto.sonido);

  // Mezclar opciones
  const opcionesMezcladas = numeros
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  if (!opcionesMezcladas.includes(numeroCorrecto)) {
    opcionesMezcladas[Math.floor(Math.random() * 4)] = numeroCorrecto;
  }

  opcionesDiv.innerHTML = "";
  opcionesMezcladas.forEach(num => {
    const boton = document.createElement("button");
    boton.textContent = num.numero;
    boton.classList.add("tarjeta");
    boton.onclick = () => verificarRespuesta(num.numero);
    opcionesDiv.appendChild(boton);
  });
}

// ✅ Verificar respuesta
function verificarRespuesta(respuesta) {
  if (respuesta === numeroCorrecto.numero) {
    resultado.textContent = "✅ Correct!";
    resultado.style.color = "green";
  } else {
    resultado.textContent = `❌ Wrong! It was ${numeroCorrecto.numero}.`;
    resultado.style.color = "red";
  }

  setTimeout(generarPregunta, 2000);
}

// ▶️ Iniciar test
generarPregunta();
