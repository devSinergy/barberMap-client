<script>
  /** @type {string[]} */
  export let images = [];
  let currentIndex = 0;

  import { onMount } from "svelte";
  onMount(() => {
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
    }, 3000);
    return () => clearInterval(interval);
  });

  const nextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
  };

  const prevImage = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  };
</script>

<main>
  <div class="relative">
    <!-- Imagen del carrusel -->
    <img
      src={images[currentIndex]}
      alt="Imagen del Carrusel"
      class="w-full h-full transition-opacity duration-900 object-cover rounded-lg shadow-lg"
    />

    <!-- Botones de navegación con círculos completos -->
    <button
      on:click={prevImage}
      class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue/70 text-white w-12 h-12 ml-2 flex items-center justify-center rounded-full"
    >
      <span class="text-2xl">&#8592;</span>
      <!-- Flecha hacia la izquierda -->
    </button>
    <button
      on:click={nextImage}
      class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue/70 text-white w-12 h-12 mr-2 flex items-center justify-center rounded-full"
    >
      <span class="text-2xl">&#8594;</span>
      <!-- Flecha hacia la derecha -->
    </button>
  </div>
</main>
