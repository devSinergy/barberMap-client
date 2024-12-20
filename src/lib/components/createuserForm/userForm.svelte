<script>
    import { createUser } from "$lib/comunications/endpoints/userRoutes";
    export let barbershopid
    export let showUser = false
    export let close
    let formUser = {name:'',userphone:'',password:''}

    const addUser = async() =>{
        if(!formUser.name || !formUser.userphone || !formUser.password){
            alert("Por favor, completa todos los campos.");
            return;
        }
        try {
            const response = await createUser(formUser,barbershopid);
            formUser = {name:'',userphone:'',password:''}
            const message = response.message;
            close()
            alert(message)
        } catch (error) {
            throw error
        }
    }
</script>
<main>
    {#if showUser}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg relative w-11/12 max-w-lg">
            <button 
                class="absolute top-2 right-2 text-gray-500 hover:text-gray-700" 
                on:click={close}>
                cerrar
            </button>

            <h2 class="text-xl font-bold mb-4 text-center text-black">Crear Nuevo Usuario</h2>
            <form on:submit|preventDefault={() => addUser()} class="space-y-4 text-black">
                <label>
                    Nombre del Cliente:
                    <input type="text" bind:value={formUser.name} placeholder="Nombre del cliente" class="border rounded p-2 w-full mt-1" />
                </label>
                <label>
                    Telefono
                    <input type="number" bind:value={formUser.userphone} placeholder="Telefono" class="border rounded p-2 w-full mt-1" />
                </label>
                <label>
                    Contraseña
                    <input type="password" bind:value={formUser.password}  placeholder="*******" class="border rounded p-2 w-full mt-1" />
                </label>
                <button type="submit" class="bg-gray-900 text-white p-2 mt-4 rounded-lg">Añadir usuario</button>
            </form>
        </div>
    </div>
    {/if}
</main>