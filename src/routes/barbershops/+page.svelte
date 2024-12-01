<script>
  import NavBar from "$lib/components/navBar/navBar.svelte";
  import "/src/global.css";
  import { goto } from "$app/navigation";
  export let data; // Recibe los datos de barberos desde el load()
  const { barberShops, codigoPostal } = data;

  let filters = {
    codigoPostal,
    nombre: "",
    estado: "",
  };
  $: filteredBarberShops = barberShops.filter(
    (
      /** @type {{ postalcode: string | string[]; name: string; status: string; }} */ barbershop
    ) => {
      return (
        (filters.codigoPostal === "" ||
          barbershop.postalcode?.includes(filters.codigoPostal)) &&
        (filters.nombre === "" ||
          barbershop.name
            ?.toLowerCase()
            .includes(filters.nombre.toLowerCase())) &&
        (filters.estado === "" ||
          barbershop.status?.toLowerCase() === filters.estado.toLowerCase())
      );
    }
  );

  function resetFilters() {
    filters = {
      codigoPostal: "",
      nombre: "",
      estado: "",
    };
  }
</script>

<main>
  <NavBar />

  <section class="p-6 bg-sand/65">
    <!-- Fondo del formulario -->
    <form
      class="mb-6 flex flex-wrap gap-4 items-center bg-beige p-2 rounded-lg shadow-md border-2 border-brick"
    >
      <input
        type="text"
        bind:value={filters.nombre}
        placeholder="Nombre de la barbería"
        class="p-2 border rounded w-full border-brick focus:ring focus:ring-amber
              lg:w-[20%]"
      />
      <input
        type="text"
        bind:value={filters.codigoPostal}
        placeholder="Código Postal"
        class="p-2 border rounded w-full border-brick focus:ring focus:ring-amber
              lg:w-[20%]"
      />
      <select
        bind:value={filters.estado}
        class="p-2 border rounded w-full border-brick focus:ring focus:ring-amber
              lg:w-[20%]"
      >
        <option value="">Estado</option>
        <option value="disponible">Disponible</option>
        <option value="no disponible">No Disponible</option>
      </select>
      <button
        type="button"
        on:click={resetFilters}
        class="bg-amber text-white px-4 py-2 w-full rounded hover:bg-tan
              lg:w-[20%] lg:ml-60"
      >
        Limpiar
      </button>
    </form>

    <h1
      class="text-3xl font-extrabold uppercase text-coffee text-center mb-6
              lg:flex lg:justify-star"
    >
      Lista de Barberías
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
      {#if filteredBarberShops.length > 0}
        {#each filteredBarberShops as barbershop}
          <div
            class="relative rounded-lg shadow-lg overflow-hidden bg-beige group border-2 border-brick hover:border-amber hover:shadow-amber/50"
          >
            <img
              src={barbershop.cover}
              alt="barbershop"
              class="w-full h-[300px] object-cover transition-opacity duration-300 group-hover:opacity-50 p-2"
            />
            <div
              class="absolute inset-0 p-4 bg-black bg-opacity-70 flex flex-col justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <div
                class="absolute top-4 right-4 flex items-center space-x-1 text-blue"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <p class="text-md">{barbershop.views}</p>
              </div>
              <div>
                <h2 class="text-xl pb-2 text-white font-semibold uppercase">
                  {barbershop.name}
                </h2>
                <p
                  class="text-lg text-white mb-4 underline underline-offset-8 uppercase-first-only"
                >
                  {barbershop.addres}
                </p>
                <p class="text-lg text-white">
                  Telefono : {barbershop.phonenumber}
                </p>
                <button
                  class="bg-amber text-white rounded-lg w-full px-4 py-2 mt-6 font-bold hover:bg-tan
                  lg:w-1/6"
                  on:click={() => goto(`/barbershops/${barbershop._id}`)}
                >
                  Visitar
                </button>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </section>
</main>
