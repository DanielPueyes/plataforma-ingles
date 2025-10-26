const animales = [
  { nombre: "Cat", imagen: "assets/img/animales/Cat.png", sonido: "assets/audio/animales/Cat.mp3" },
  { nombre: "Dog", imagen: "assets/img/animales/Dog.png", sonido: "assets/audio/animales/Dog.mp3" },
  { nombre: "Mouse", imagen: "assets/img/animales/Mouse.png", sonido: "assets/audio/animales/Mouse.mp3" },
  { nombre: "Horse", imagen: "assets/img/animales/Horse.png", sonido: "assets/audio/animales/Horse.mp3" },
  { nombre: "Bear", imagen: "assets/img/animales/Bear.png", sonido: "assets/audio/animales/Bear.mp3" },
  { nombre: "Rabbit", imagen: "assets/img/animales/Rabbit.png", sonido: "assets/audio/animales/Rabbit.mp3" },
  { nombre: "Wolf", imagen: "assets/img/animales/Wolf.png", sonido: "assets/audio/animales/Wolf.mp3" },
  { nombre: "Tiger", imagen: "assets/img/animales/Tiger.png", sonido: "assets/audio/animales/Tiger.mp3" },
  { nombre: "Giraffe", imagen: "assets/img/animales/Giraffe.png", sonido: "assets/audio/animales/Giraffe.mp3" },
  { nombre: "Zebra", imagen: "assets/img/animales/Zebra.png", sonido: "assets/audio/animales/Zebra.mp3" },
  { nombre: "Goat", imagen: "assets/img/animales/Goat.png", sonido: "assets/audio/animales/Goat.mp3" },
  { nombre: "Whale", imagen: "assets/img/animales/Whale.png", sonido: "assets/audio/animales/Whale.mp3" },
  { nombre: "Fox", imagen: "assets/img/animales/Fox.png", sonido: "assets/audio/animales/Fox.mp3" },
  { nombre: "Monkey", imagen: "assets/img/animales/Monkey.png", sonido: "assets/audio/animales/Monkey.mp3" },
  { nombre: "Camel", imagen: "assets/img/animales/Camel.png", sonido: "assets/audio/animales/Camel.mp3" },
  { nombre: "Elephant", imagen: "assets/img/animales/Elephant.png", sonido: "assets/audio/animales/Elephant.mp3" },
  { nombre: "Raccoon", imagen: "assets/img/animales/Raccoon.png", sonido: "assets/audio/animales/Raccoon.mp3" },
  { nombre: "Lion", imagen: "assets/img/animales/Lion.png", sonido: "assets/audio/animales/Lion.mp3" },
  { nombre: "Donkey", imagen: "assets/img/animales/Donkey.png", sonido: "assets/audio/animales/Donkey.mp3" },
  { nombre: "Deer", imagen: "assets/img/animales/Deer.png", sonido: "assets/audio/animales/Deer.mp3" },
  { nombre: "Bull", imagen: "assets/img/animales/Bull.png", sonido: "assets/audio/animales/Bull.mp3" },
  { nombre: "Turkey", imagen: "assets/img/animales/Turkey.png", sonido: "assets/audio/animales/Turkey.mp3" },
  { nombre: "Pig", imagen: "assets/img/animales/Pig.png", sonido: "assets/audio/animales/Pig.mp3" },
  { nombre: "Bird", imagen: "assets/img/animales/Bird.png", sonido: "assets/audio/animales/Bird.mp3" },
  { nombre: "Penguin", imagen: "assets/img/animales/Penguin.png", sonido: "assets/audio/animales/Penguin.mp3" },
  { nombre: "Cow", imagen: "assets/img/animales/Cow.png", sonido: "assets/audio/animales/Cow.mp3" },
  { nombre: "Fish", imagen: "assets/img/animales/Fish.png", sonido: "assets/audio/animales/Fish.mp3" },
  { nombre: "Duck", imagen: "assets/img/animales/Duck.png", sonido: "assets/audio/animales/Duck.mp3" },
  { nombre: "Snake", imagen: "assets/img/animales/Snake.png", sonido: "assets/audio/animales/Snake.mp3" }
];

const preguntaTexto = document.getElementById("texto-pregunta");
const imagenAnimal = document.getElementById("imagen-animal");
const opcionesDiv = document.getElementById("opciones");
const resultado = document.getElementById("resultado");

let animalCorrecto = null;
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

  const indice = Math.floor(Math.random() * animales.length);
  animalCorrecto = animales[indice];

  imagenAnimal.src = animalCorrecto.imagen;
  imagenAnimal.alt = animalCorrecto.nombre;

  // 🔊 Reproducir sonido del animal mostrado
  reproducirSonido(animalCorrecto.sonido);

  // Repetir sonido al hacer clic
  imagenAnimal.onclick = () => reproducirSonido(animalCorrecto.sonido);

  // Mezclar opciones
  const opcionesMezcladas = animales
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  if (!opcionesMezcladas.includes(animalCorrecto)) {
    opcionesMezcladas[Math.floor(Math.random() * 4)] = animalCorrecto;
  }

  opcionesDiv.innerHTML = "";
  opcionesMezcladas.forEach(animal => {
    const boton = document.createElement("button");
    boton.textContent = animal.nombre;
    boton.classList.add("tarjeta");
    boton.onclick = () => verificarRespuesta(animal.nombre);
    opcionesDiv.appendChild(boton);
  });
}

// ✅ Verificar respuesta
function verificarRespuesta(respuesta) {
  if (respuesta === animalCorrecto.nombre) {
    resultado.textContent = "✅ Correct!";
    resultado.style.color = "green";
  } else {
    resultado.textContent = `❌ Wrong! It was ${animalCorrecto.nombre}.`;
    resultado.style.color = "red";
  }

  setTimeout(generarPregunta, 2000);
}

// ▶️ Iniciar test
generarPregunta();
