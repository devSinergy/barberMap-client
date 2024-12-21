<script>
   
    /** @type {string[]} */
    export let images = []; 
     let currentIndex = 0;    

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
      class="absolute left-1 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full shadow hover:bg-gray-100 hover:text-gray-900"
      aria-label="Imagen anterior"
    >
      <!-- Ícono izquierda -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      
      
      
      
    </button>

    <!-- Botón para la derecha -->
    <button
      on:click={nextImage}
      class="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full shadow hover:bg-gray-100 hover:text-gray-900"
      aria-label="Imagen siguiente"
    >
      <!-- Ícono derecha -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
      
      
    </button>
  </div>
</main>
