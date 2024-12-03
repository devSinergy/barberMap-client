<script>
  // @ts-nocheck

  import DynamicButton from "$lib/components/button/DynamicButton.svelte";
  import NavBar from "$lib/components/navBar/navBar.svelte";
  import "/src/global.css";
  import { goto } from "$app/navigation";
  export let data; // Recibe los datos de barberos desde el load()
  const { barberShops, codigoPostal } = data;

  let voluta = "/images/volutas/voluta_1.svg";

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

  <section class="p-6 bg-white/20">
    <!-- Fondo del formulario -->
    <form
      class="mb-6 flex flex-wrap gap-4 items-center bg-black/70 p-2 rounded-lg shadow-md border-2 border-gradient"
    >
      <input
        type="text"
        bind:value={filters.nombre}
        placeholder="Nombre de la barbería"
        class="p-2 border-2 rounded w-full border-blue/20 focus:ring focus:ring-red/25
              lg:w-[20%]"
      />
      <input
        type="text"
        bind:value={filters.codigoPostal}
        placeholder="Código Postal"
        class="p-2 border-2 rounded w-full border-blue/20 focus:ring focus:ring-red/25
              lg:w-[20%]"
      />
      <select
        bind:value={filters.estado}
        class="p-2 border-2 rounded w-full border-blue/20 focus:ring focus:ring-red/25
              lg:w-[20%]"
      >
        <option value="">Estado</option>
        <option value="disponible">Disponible</option>
        <option value="no disponible">No Disponible</option>
      </select>
      <div class="flex ml-auto w-full lg:w-0 lg:ml-72">
        <DynamicButton text="Limpiar" onClick={resetFilters} />
      </div>
    </form>

    <h1
      class="flex flex-row justify-around align-center text-2xl font-extrabold uppercase text-coffee text-center mb-6
              lg:flex lg:flex-row lg:justify-center lg:gap-4"
    >
      <img
        src={voluta}
        class="w-16 scale-x-[-1] filter- invert hue-rotate-90"
        alt=""
      />
      Barberías
      <img src={voluta} class="w-16 filter invert hue-rotate-90" alt="" />
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
      {#if filteredBarberShops.length > 0}
        {#each filteredBarberShops as barbershop}
          <div
            class="relative rounded-lg shadow-lg overflow-hidden group border-2 border-gradient hover:border-amber hover:shadow-blue/50"
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
              </div>
              <div class="relative mt-4 w-full">
                <DynamicButton
                  text="Visitar"
                  onClick={() => goto(`/barbershops/${barbershop._id}`)}
                />
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </section>
</main>
