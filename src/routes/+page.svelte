<script>
  import "/src/global.css";
  import { goto } from "$app/navigation";
  let background = "/images/backgrounds/barber1.jpg";
  let showModal = true;
  let postalCode = "";

  function searchBarberShop() {
    if (postalCode.trim() !== "") {
      goto(`/barbershops?codigoPostal=${encodeURIComponent(postalCode)}`);
    } else {
      alert("Porfavor , ingresa un codigo postal");
    }
  }

  function goToLogin(){
    goto(`/login`)
  }

  function gotoContact(){
    goto(`/contacto`)
  }
</script>

<main>
  <section class="max-w-full relative overflow-hidden">
    <img
      src={background}
      alt="fondo"
      class="w-full h-full object-cover fixed"
    />
  </section>
  {#if showModal}
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-70"></div>

    <!-- Modal -->
    <div class="steam fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" >
      <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-6 rounded-lg shadow-lg w-80">
        <h2 class="text-2xl font-bold text-center mb-2">
          Welcome to BarberMap
        </h2>
        <h3 class="text-s font-semibold mb-4 mt-6 text-gray-800">
          Descubre las mejores barberías cerca de ti, ingresa tu código postal
          para encontrar las opciones disponibles y comprobar si el servicio
          está activo en tu zona.
        </h3>
        <input
          type="text"
          bind:value={postalCode}
          placeholder="Código postal"
          class="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          on:click={searchBarberShop}
          class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-600"
        >
          Buscar
        </button>
      </div>
    </div>
    <div class="fixed top-6 right-6 z-50 flex flex-col gap-4 justify-around">
      <button
        on:click={goToLogin}
        class="p-2 text-white hover:bg-gray-800 rounded flex items-center justify-center"
      >
        <!-- Ícono de usuario -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
        
      </button>
      <button  on:click={gotoContact}
      class="p-2 text-white hover:bg-gray-800 rounded flex items-center justify-center" aria-label="contact">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
      
      </button>
      
      
    </div>
  {/if}
</main>
