<script>
   
    /** @type {string[]} */
    export let images = []; 
     let currentIndex = 0;

     import { onMount } from "svelte";
     onMount(()=>{
        const interval = setInterval(()=>{
            currentIndex = (currentIndex + 1 ) % images.length;
        },5000);
        return () => clearInterval(interval);
     });

     const nextImage = () =>{
        currentIndex = ( currentIndex + 1) % images.length;
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
      class="w-full h-full object-cover rounded-lg shadow-lg"
    />

    <!-- Botón para la izquierda -->
    <button
      on:click={prevImage}
      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-100"
      aria-label="Imagen anterior"
    >
      <!-- Ícono izquierda -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
      </svg>
    </button>

    <!-- Botón para la derecha -->
    <button
      on:click={nextImage}
      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-100"
      aria-label="Imagen siguiente"
    >
      <!-- Ícono derecha -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>
</main>
