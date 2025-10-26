// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Identifica qué página está activa por el id del <body>
  const pagina = document.body.id;
  console.log(`Página actual: ${pagina}`);

  // Lógica común a todas las categorías
  if (pagina && pagina !== "index") {
    inicializarCategoria(pagina);
  }
});

/**
 * Inicializa la lógica general de cualquier categoría.
 * @param {string} categoria - nombre de la categoría (debe coincidir con la carpeta)
 */
function inicializarCategoria(categoria) {
  const tarjetas = document.querySelectorAll(".tarjeta");

  if (tarjetas.length === 0) {
    console.warn(`No se encontraron tarjetas en ${categoria}.html`);
    return;
  }

  tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener("click", () => {
      const sonido = tarjeta.dataset.sonido;
      if (sonido) reproducirSonido(categoria, sonido);
      animarTarjeta(tarjeta);
    });
  });
}

/**
 * Reproduce el sonido correspondiente a la tarjeta seleccionada.
 * @param {string} categoria - carpeta donde se encuentran los sonidos
 * @param {string} archivo - nombre del archivo de sonido
 */
function reproducirSonido(categoria, archivo) {
  const ruta = `assets/audio/${categoria}/${archivo}`;
  const audio = new Audio(ruta);
  audio.volume = 0.8;
  audio.play().catch((error) => console.error("Error al reproducir sonido:", error));
}

/**
 * Añade una animación breve al hacer clic.
 * @param {HTMLElement} elemento - tarjeta a animar
 */
function animarTarjeta(elemento) {
  elemento.classList.add("activo");
  setTimeout(() => elemento.classList.remove("activo"), 500);
}
