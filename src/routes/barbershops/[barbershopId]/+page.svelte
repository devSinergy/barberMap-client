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
  <nav class="bg-sand/50 p-4">
    <ul
      class="mb-6 flex flex-wrap gap-4 justify-around bg-beige p-4 rounded-lg shadow-md border-2 border-brick lg:space-x-[300px]"
    >
      <li>
        <button
          class={activeTab === "info"
            ? "text-amber"
            : "text-coffee hover:text-amber"}
          on:click={() => (activeTab = "info")}>Info</button
        >
      </li>
      <li>
        <button
          class={activeTab === "services" ? "text-amber" : "text-coffee"}
          on:click={() => (activeTab = "services")}>Servicios</button
        >
      </li>
      <li>
        <button
          class={activeTab === "workers" ? "text-amber" : "text-coffee"}
          on:click={() => (activeTab = "workers")}>Trabajadores</button
        >
      </li>
    </ul>
  </nav>
  <section>
    {#if activeTab === "info"}
      <div
        class="text-3xl font-extrabold uppercase text-coffee text-center mb-6
        lg:flex lg:justify-star"
      >
        <h2>Información</h2>
      </div>
      <div class="flex flex-col lg:flex-row">
        <div>
          <div class="w-full lg:w-1/2 p-4 mb-4">
            <h2 class="text-xl pb-2 text-brick font-semibold uppercase">
              {detailStore.name}
            </h2>
            <p
              class="text-lg text-brick mb-4 underline underline-offset-8 uppercase-first-only"
            >
              {detailStore.addres}, {detailStore.postalcode}
            </p>
            <p class="text-lg text-brick">
              Telefono : {detailStore.phonenumber}
            </p>
          </div>
          <div class="overflow-x-auto p-4">
            <table
              class="min-w-full table-auto bg-beige shadow-md rounded-lg border-4 border-brick"
            >
              <thead class=" text-white border-4 border-brick border-b-0">
                <tr class=" bg-amber border-brick text-left">
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
                  <tr class="border-b hover:bg-sand">
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
        class="text-2xl text-center mt-4 mb-4 font-serif font-semibold underline underline-offset-8"
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
