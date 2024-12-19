<script>
    import { createService } from "$lib/comunications/endpoints/servicesRoutes";
    export let barbershopid
    export let show = false
    export let closeModal
    let  serviceForm = {title:'', description:'', price:''}

    const addService= async () =>{
        if(!serviceForm.title || !serviceForm.description || !serviceForm.price){
            alert("Porfavor, completa todos los campos")
            return
        }
        try {
            const response = await createService(serviceForm,barbershopid);
            serviceForm = {title:'', description:'', price:''}
            closeModal()
        } catch (error) {
            throw error
        }
    }
</script>
<main>
    {#if show}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg relative w-11/12 max-w-lg">
            <button 
                class="absolute top-2 right-2 text-gray-500 hover:text-gray-700" 
                on:click={closeModal}>
                ✕
            </button>

            <h2 class="text-xl font-bold mb-4 text-center">Crear nuevo servicio</h2>
            <form on:submit|preventDefault={() => addService()} class="space-y-4">
                <label>
                    title
                    <input type="text" bind:value={serviceForm.title} placeholder="Titulo" class="border rounded p-2 w-full" />
                </label>
                <label>
                    Descripcion
                    <input type="text" bind:value={serviceForm.description} placeholder="Descripcioón" class="border rounded p-2 w-full" />
                </label>
                <label>
                    Precio
                    <input type="number" bind:value={serviceForm.price}  placeholder="12€" class="border rounded p-2 w-full" />
                </label>
                <button type="submit" class="bg-gray-900 text-white p-2 mt-4 rounded-lg">Agregar</button>
            </form>
        </div>
    </div>
    {/if}
</main>