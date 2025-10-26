// Navegación de categorías con click
const categorias = document.querySelectorAll('.category-card'); // 🔹 corregido aquí
categorias.forEach(cat => {
    cat.addEventListener('click', () => {
        const link = cat.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    });

    // Sonido opcional al pasar el mouse
    cat.addEventListener('mouseenter', () => {
        const audio = new Audio('assets/audio/click.wav'); // 🔹 ajusta la ruta si es necesario
        audio.volume = 0.4;
        audio.play();
    });
});

