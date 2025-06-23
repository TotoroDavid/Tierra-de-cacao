document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);

  // --- Animación de entrada para el contenido de texto y botones ---
  const contentTimeline = gsap.timeline();
  contentTimeline.from(".hero-animated-gallery__heading", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
      delay: 0.3 // Retraso inicial para el título
    })
    .from(".hero-animated-gallery__description", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out"
    }, "<0.2") // Inicia 0.2 segundos antes de que termine la animación anterior
    .from(".hero-animated-gallery__buttons .button", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
      stagger: 0.2
    }, "<0.2"); // Inicia 0.2 segundos antes de que termine la animación anterior


  // --- Animación de entrada para las imágenes individuales ---
  // Selecciona todas las imágenes dentro de los image-wrapper
  gsap.from(".hero-animated-gallery__image", {
    duration: 1.2, // Duración de la animación para cada imagen
    opacity: 0,    // Empiezan invisibles
    y: 80,         // Se mueven desde 80px hacia abajo
    scale: 0.8,    // Empiezan un poco más pequeñas
    ease: "power3.out",
    stagger: 0.1,  // Retraso de 0.1 segundos entre cada imagen
    delay: 0.8     // Un pequeño retraso para que las imágenes aparezcan después del texto
  });


  // --- Animación de las columnas con ScrollTrigger (efecto de inversión) ---
  const mediaColumns = gsap.utils.toArray(".hero-animated-gallery__media-column");

  mediaColumns.forEach((column, index) => {
    // Determina la dirección inicial y final de cada columna para el efecto de scroll
    // Ajusta estos valores basados en la altura total de tus imágenes en la columna
    // y cómo quieres que se "desplacen" con el scroll.
    // Los valores que tenías eran startY: 0 / endY: -800 y startY: -800 / endY: 0
    // Basado en tu HTML más reciente:
    // Columna 1 (normal) tiene transform: translate3d(0px, -266.667px, 0px)
    // Columna 2 (reverse) tiene transform: translate3d(0px, -533.333px, 0px)
    // Esto significa que ya están desplazadas negativamente (hacia arriba)
    // Necesitamos definir un rango de movimiento que GSAP pueda controlar.
    // Voy a usar un rango que abarque un movimiento completo para el efecto de scroll.

    let startOffset, endOffset;
    if (index % 2 === 0) { // Primera columna (o cualquier columna par)
      // Queremos que esta columna se mueva hacia arriba a medida que hacemos scroll hacia abajo
      // Podría empezar ligeramente por debajo de su posición "natural" y subir.
      startOffset = 200; // Empieza 200px abajo
      endOffset = -800;  // Termina 800px arriba
    } else { // Segunda columna (o cualquier columna impar)
      // Queremos que esta columna se mueva hacia abajo a medida que hacemos scroll hacia abajo
      // Podría empezar ligeramente por encima de su posición "natural" y bajar.
      startOffset = -800; // Empieza 800px arriba
      endOffset = 200;   // Termina 200px abajo
    }


    gsap.fromTo(column, {
      y: startOffset
    }, {
      y: endOffset,
      ease: "none", // Movimiento lineal con el scroll
      scrollTrigger: {
        trigger: ".hero-animated-gallery__media-grid", // El contenedor que disparará la animación
        start: "top bottom", // Cuando la parte superior del grid entra por la parte inferior de la ventana
        end: "bottom top",   // Cuando la parte inferior del grid sale por la parte superior de la ventana
        scrub: true,         // Vincula la animación al scroll
        // markers: true,       // Descomenta para ver los marcadores de ScrollTrigger
        // Para depuración, puedes ver los valores del scroll
        // onUpdate: self => console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity())
      }
    });
  });
});