<script>
    import NavBar from "$lib/components/navBar/navBar.svelte";
    import "/src/global.css";
    let barbershop1 = "/images/barberShops/barberia.jpg"
    export let data; // Recibe los datos de barberos desde el load()
    const { barberShops} = data
</script>
<main>
    <NavBar />
    <section class="p-6 bg-gray-100">
        <h1 class="text-2xl font-bold text-center mb-6">Lista de Barberias</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each barberShops as barbershop}
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
                </div>
            </div>
            {/each}
        </div>
    </section>
    
</main>