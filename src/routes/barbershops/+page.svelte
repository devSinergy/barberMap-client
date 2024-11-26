<script>
    import NavBar from "$lib/components/navBar/navBar.svelte";
    import "/src/global.css";
    let barbershop1 = "/images/barberShops/barberia.jpg"
    export let data // Recibe los datos de barberos desde el load()
    const { barberShops, codigoPostal} = data;
    
    let filters = {
    codigoPostal,
    nombre: '',
    estado: ''
     };
     $: filteredBarberShops = barberShops.filter((/** @type {{ postalcode: string | string[]; name: string; estado: string; }} */ barbershop) => {
    return (
      (filters.codigoPostal === '' || barbershop.postalcode?.includes(filters.codigoPostal)) &&
      (filters.nombre === '' || barbershop.name?.toLowerCase().includes(filters.nombre.toLowerCase())) &&
      (filters.estado === '' || barbershop.estado?.toLowerCase() === filters.estado.toLowerCase())
    );
  });

  function resetFilters() {
    filters = {
      codigoPostal: '',
      nombre: '',
      estado: ''
    };
  }
</script>
<main>
    <NavBar />
    
    <section class="p-6 bg-gray-100">
        <form class="mb-6 flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow-md">
            <input 
              type="text" 
              bind:value={filters.codigoPostal} 
              placeholder="Código Postal"
              class="p-2 border rounded w-48"
            />
            <input 
              type="text" 
              bind:value={filters.nombre} 
              placeholder="Nombre de la barbería"
              class="p-2 border rounded w-48"
            />
            <select 
              bind:value={filters.estado}
              class="p-2 border rounded w-48"
            >
              <option value="">Estado</option>
              <option value="disponible">Disponible</option>
              <option value="no-disponible">No Disponible</option>
            </select>
            <button type="button" on:click={resetFilters} class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Limpiar
            </button>
          </form>

          <h1 class="text-2xl font-bold text-center mb-6">Lista de Barberías</h1>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#if filteredBarberShops.length > 0}
              {#each filteredBarberShops as barbershop}
              <div class="rounded-lg shadow-lg overflow-hidden bg-white">
                <!-- Imagen -->
                <img 
                  src={barbershop1} 
                  alt="barbershop" 
                  class="w-full h-40 object-cover"
                />
                <!-- Contenido -->
                <div class="p-4">
                  <h2 class="text-lg font-semibold">{barbershop.name}</h2>
                  <p class="text-sm text-gray-600">Código Postal: {barbershop.postalcode}</p>
                  <p class="text-sm text-gray-600">Teléfono: {barbershop.phonenumber}</p>
                  <p class="text-sm text-gray-600">Estado: {barbershop.estado}</p>
                </div>
              </div>
              {/each}
            {:else}
              <p class="text-center text-gray-600 col-span-full">No se encontraron barberías con los filtros aplicados.</p>
            {/if}
          </div>
    </section>
    
</main>