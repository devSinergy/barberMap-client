<script>
   
    /** @type {string[]} */
    export let images = []; 
     let currentIndex = 0;

     import { onMount } from "svelte";
     onMount(()=>{
        const interval = setInterval(()=>{
            currentIndex = (currentIndex + 1 ) % images.length;
        },3000);
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
        
        <!-- Botones de navegación -->
        <button
          on:click={prevImage}
          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full"
        >
          &#8592;
        </button>
        <button
          on:click={nextImage}
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full"
        >
          &#8594;
        </button>
      </div>
</main>