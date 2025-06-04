<script>
// @ts-nocheck

  import { onMount, onDestroy } from 'svelte';

  /** @type {string[]} */
  export let images = []; 
  let currentIndex = 0;    
  let interval;

  const nextImage = () => {
      currentIndex = (currentIndex + 1) % images.length;
  };

  onMount(() => {
      interval = setInterval(nextImage, 3000); // cambia cada 3 segundos
  });

  onDestroy(() => {
      clearInterval(interval); // limpiar cuando se destruya el componente
  });
</script>
<main>
  <div class="relative w-full h-[400px]  overflow-hidden shadow-lg">
    <!-- Imagen -->
    {#if images.length > 0}
      <img
        src={images[currentIndex]}
        alt="Imagen del Carrusel"
        class="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
      />
    {/if}

    <!-- Capa oscura -->
    <div class="absolute inset-0   z-10"></div>

    <!-- Título encima -->
    
  </div>
</main>

