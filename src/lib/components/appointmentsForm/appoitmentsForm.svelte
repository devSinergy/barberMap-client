<script>
    import { createAppoitmens } from "$lib/comunications/endpoints/appoitmensRoutes";
    export let barbershopid;
    export let show = false;
    export let closeModal;
    let formData = { clientname: '', date: '', hour: '', lapsetime: '' };

    // Configurar la fecha mínima como el día siguiente
    const today = new Date();
    today.setDate(today.getDate() + 1); // Mover al siguiente día
    const minDate = today.toISOString().split("T")[0]; // Formato YYYY-MM-DD

    const addAppointment = async () => {
        if (!formData.clientname || !formData.date || !formData.hour || !formData.lapsetime) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        try {
            const response = await createAppoitmens(formData, barbershopid);
            formData = { clientname: '', date: '', hour: '', lapsetime: '' }
            closeModal();
        } catch (error) {
            throw error;
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

            <h2 class="text-xl font-bold mb-4 text-center">Crear Nueva Cita</h2>
            <form on:submit|preventDefault={() => addAppointment()} class="space-y-4">
                <label>
                    Nombre del Cliente:
                    <input type="text" bind:value={formData.clientname} placeholder="Nombre del cliente" class="border rounded p-2 w-full" />
                </label>
                <label>
                    Fecha:
                    <input type="date" bind:value={formData.date} min={minDate} class="border rounded p-2 w-full" />
                </label>
                <label>
                    Hora:
                    <input type="text" bind:value={formData.hour} placeholder="Formato 00:00" class="border rounded p-2 w-full" />
                </label>
                <label>
                    Duración:
                    <input type="text" bind:value={formData.lapsetime} placeholder="Duración (30 minutos)" class="border rounded p-2 w-full" />
                </label>
                <button type="submit" class="bg-gray-900 text-white p-2 mt-4 rounded-lg">Agregar</button>
            </form>
        </div>
    </div>
    {/if}
</main>
