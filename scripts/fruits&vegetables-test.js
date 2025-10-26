const frutasYvegetales = [
  { nombre: "Apple", imagen: "assets/img/frutas/Apple.png", sonido: "assets/audio/frutas/apple.mp3" },
  { nombre: "Banana", imagen: "assets/img/frutas/Banana.png", sonido: "assets/audio/frutas/banana.mp3" },
  { nombre: "Orange", imagen: "assets/img/frutas/Orange.png", sonido: "assets/audio/frutas/orange.mp3" },
  { nombre: "Strawberry", imagen: "assets/img/frutas/Strawberry.png", sonido: "assets/audio/frutas/strawberry.mp3" },
  { nombre: "Watermelon", imagen: "assets/img/frutas/Watermelon.png", sonido: "assets/audio/frutas/watermelon.mp3" },
  { nombre: "Peach", imagen: "assets/img/frutas/Peach.png", sonido: "assets/audio/frutas/peach.mp3" },
  { nombre: "Lemon", imagen: "assets/img/frutas/Lemon.png", sonido: "assets/audio/frutas/lemon.mp3" },
  { nombre: "Pineapple", imagen: "assets/img/frutas/Pineapple.png", sonido: "assets/audio/frutas/pineapple.mp3" },
  { nombre: "Pear", imagen: "assets/img/frutas/Pear.png", sonido: "assets/audio/frutas/pear.mp3" },
  { nombre: "Cherry", imagen: "assets/img/frutas/Cherry.png", sonido: "assets/audio/frutas/cherry.mp3" },
  { nombre: "Potato", imagen: "assets/img/frutas/Potato.png", sonido: "assets/audio/frutas/potato.mp3" },
  { nombre: "Beetroot", imagen: "assets/img/frutas/Beetroot.png", sonido: "assets/audio/frutas/beetroot.mp3" },
  { nombre: "Carrot", imagen: "assets/img/frutas/Carrot.png", sonido: "assets/audio/frutas/carrot.mp3" },
  { nombre: "Tomato", imagen: "assets/img/frutas/Tomato.png", sonido: "assets/audio/frutas/tomato.mp3" },
  { nombre: "Lettuce", imagen: "assets/img/frutas/Lettuce.png", sonido: "assets/audio/frutas/lettuce.mp3" },
  { nombre: "Onion", imagen: "assets/img/frutas/Onion.png", sonido: "assets/audio/frutas/onion.mp3" },
  { nombre: "Corn", imagen: "assets/img/frutas/Corn.png", sonido: "assets/audio/frutas/corn.mp3" },
  { nombre: "Cucumber", imagen: "assets/img/frutas/Cucumber.png", sonido: "assets/audio/frutas/cucumber.mp3" },
  { nombre: "Broccoli", imagen: "assets/img/frutas/Broccoli.png", sonido: "assets/audio/frutas/broccoli.mp3" },
  { nombre: "Spinach", imagen: "assets/img/frutas/Spinach.png", sonido: "assets/audio/frutas/spinach.mp3" }
];

const preguntaTexto = document.getElementById("texto-pregunta");
const imagenFrutaVegetal = document.getElementById("imagen-fruta-vegetal");
const opcionesDiv = document.getElementById("opciones");
const resultado = document.getElementById("resultado");

let frutaVegetalCorrecto = null;
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

  const indice = Math.floor(Math.random() * frutasYvegetales.length);
  frutaVegetalCorrecto = frutasYvegetales[indice];

  imagenFrutaVegetal.src = frutaVegetalCorrecto.imagen;
  imagenFrutaVegetal.alt = frutaVegetalCorrecto.nombre;

  // 🔊 Reproducir sonido de la fruta o vegetal mostrado
  reproducirSonido(frutaVegetalCorrecto.sonido);

  // Repetir sonido al hacer clic
  imagenFrutaVegetal.onclick = () => reproducirSonido(frutaVegetalCorrecto.sonido);

  // Mezclar opciones
  const opcionesMezcladas = frutasYvegetales
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  if (!opcionesMezcladas.includes(frutaVegetalCorrecto)) {
    opcionesMezcladas[Math.floor(Math.random() * 4)] = frutaVegetalCorrecto;
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
  if (respuesta === frutaVegetalCorrecto.nombre) {
    resultado.textContent = "✅ Correct!";
    resultado.style.color = "green";
  } else {
    resultado.textContent = `❌ Wrong! It was ${frutaVegetalCorrecto.nombre}.`;
    resultado.style.color = "red";
  }

  setTimeout(generarPregunta, 2000);
}

// ▶️ Iniciar test
generarPregunta();
