<script>
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
</script>

<main>
  <section class="max-w-full relative h-[800px]">
    <img src={background} alt="fondo" class="w-full h-full object-cover" />
  </section>
  {#if showModal}
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

    <!-- Modal -->
    <div
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-6 rounded-lg shadow-lg w-80"
    >
      <h2 class="text-2xl font-bold text-center mb-2">Welcome to BarberMap</h2>
      <h3 class="text-s font-semibold mb-4 mt-6 text-gray-800 text-center">
        Descubre las mejores barberías cerca de ti, ingresa tu código
        postal para encontrar las opciones disponibles y comprobar si el
        servicio está activo en tu zona.
      </h3>
      <input
        type="text"
        bind:value={postalCode}
        placeholder="Código postal"
        class="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button
        on:click={searchBarberShop}
        class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray -600"
      >
        Buscar
      </button>
    </div>
  {/if}
</main>
