<script>
  import NavBar from "$lib/components/navBar/navBar.svelte";
  import Carousel from "$lib/components/carrousel/carousel.svelte";
  export let data;
  const { detailStore, services, calendar } = data;
  import "/src/global.css";
  let activeTab = "info";
  console.log(calendar);
  console.log(services);
</script>

<main>
  <NavBar />
  <nav class=" p-4">
    <ul
      class="bg-black/40 mb-6 flex flex-wrap gap-4 justify-around p-4 rounded-lg shadow-md border-gradient lg:space-x-[300px]"
    >
      <li>
        <button
          class={activeTab === "info" ? "text-white/80 " : "text-white "}
          on:click={() => (activeTab = "info")}>Info</button
        >
      </li>
      <li>
        <button
          class={activeTab === "services" ? "text-white/80" : "text-maroni"}
          on:click={() => (activeTab = "services")}>Servicios</button
        >
      </li>
      <li>
        <button
          class={activeTab === "workers" ? "text-white/80" : "text-maroni"}
          on:click={() => (activeTab = "workers")}>Trabajadores</button
        >
      </li>
    </ul>
  </nav>
  <section>
    {#if activeTab === "info"}
      <div
        class="text-3xl font-extrabold uppercase text-maroni text-center mb-6
        lg:flex lg:justify-star"
      >
        <h2>Información</h2>
      </div>
      <div class="flex flex-col lg:flex-row">
        <div>
          <div class="w-full lg:w-1/2 p-4 mb-4">
            <h2 class="text-xl pb-2 text- font-semibold uppercase">
              {detailStore.name}
            </h2>
            <p
              class="text-lg text- mb-4 underline underline-offset-8 uppercase-first-only"
            >
              {detailStore.addres}, {detailStore.postalcode}
            </p>
            <p class="text-lg text-">
              Telefono : {detailStore.phonenumber}
            </p>
          </div>
          <div class=" m-4 border-gradient">
            <table class="min-w-full table-auto shadow-md rounded-lg">
              <thead class=" text-black border-b-0">
                <tr class=" bg-black/40 text-left">
                  <th class="px-4 py-2">Día</th>
                  <th class="px-4 py-2">Mañana</th>
                  <th class="px-4 py-2">Tarde</th>
                </tr>
              </thead>
              <tbody class="">
                {#each ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"] as dia}
                  <tr class="border-b hover:bg-sand">
                    <td class="px-4 py-2 text-sm">{dia}</td>
                    {#each calendar as horario}
                      <td class="px-4 py-2 text-sm">
                        {horario.general[0].open} - {horario.general[0].close}
                        <!-- Mañana -->
                      </td>
                      <td class="px-4 py-2 text-sm">
                        {horario.general[1].open} - {horario.general[1].close}
                        <!-- Tarde -->
                      </td>
                    {/each}
                  </tr>
                {/each}
                {#if calendar[0].sunday === true}
                  <tr class="border-b hover:bg-red/20">
                    <td class="px-4 py-2 text-sm">Domingo</td>
                    <td
                      class="px-4 py-2 text-sm text-center uppercase"
                      colspan="2">Cerrado</td
                    >
                  </tr>
                {/if}
              </tbody>
            </table>
          </div>
        </div>
        <div class="w-full lg:w-1/2 p-4">
          <Carousel images={detailStore.images} />
        </div>
      </div>
    {:else if activeTab === "services"}
      <div
        class="text-2xl text-center mt-4 mb-4 font-serif font-semibold underline-offset-8"
      >
        <h2>Servicios</h2>
      </div>
      <div
        class="flex flex-wrap justify-center lg:justify-start gap-6 mt-6 px-4"
      >
        {#each services as service}
          <div
            class="bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-64"
          >
            <!-- Título -->
            <div class="bg-black text-white text-center py-2 font-bold">
              {service.title}
            </div>
            <!-- Contenido de la tarjeta -->
            <div class="p-4">
              <p class="text-gray-700 text-sm mb-2">
                "{service.description}"
              </p>
              <p class="text-lg font-semibold text-gray-900 text-center">
                {service.price}€
              </p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</main>
