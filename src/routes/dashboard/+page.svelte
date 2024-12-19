<script>
// @ts-nocheck
    import Footer from "$lib/components/footer/footer.svelte";
    import "/src/global.css";
    import { onMount } from 'svelte';
    import { showAppoitmens,deleteApppoitmens } from "$lib/comunications/endpoints/appoitmensRoutes";
    import { getStoreHaircut ,deleteHaircut} from "$lib/comunications/endpoints/haircutRoutes";
    import { getServices,updateServices } from "$lib/comunications/endpoints/servicesRoutes.js";
    import { showReviews,deleteReviews } from "$lib/comunications/endpoints/reviewsRoutes";
    import { goto } from "$app/navigation";
    import AppoitmentsForm from "$lib/components/appointmentsForm/appoitmentsForm.svelte";
    import ServicesForm from "$lib/components/servicesForm/servicesForm.svelte";
    
    export let data;
    let editForm = {title:'',description:'',price:''}
    const barbershopid = data?.barbershopid || ''; 
    let activeTab = 'appointments';
    let showModal = false;
    let showEditModal = false;
    let showServiceModal = false;
    // @ts-ignore
    let appointments = [];
    // @ts-ignore
    let haircuts = [];
    // @ts-ignore
    let reviews = [];

    let services = [];
    let loading = true;

    // Función para obtener datos
    const fetchData = async () => {
   
    try {
        loading = true;
        appointments = await showAppoitmens(barbershopid);
        haircuts = await getStoreHaircut(barbershopid);
        reviews = await showReviews(barbershopid);
        services = await getServices(barbershopid)
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        loading = false;
        
    }
};

    onMount(() => {
        fetchData();
    });

    const deleteAppointment = async (id) => {
        try {
            const message = await deleteApppoitmens(id);
            appointments = appointments.filter(appointment => appointment._id !== id);
            alert(message)
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const deleteCute = async(id) =>{
        try {
            const message = await deleteHaircut(id);
            haircuts = haircuts.filter(haircuts => haircuts._id !==id)
            alert(message)
        } catch (error) {
            console.error('Error al eliminar el corte')
        }
    }

    const deleteReview = async(id) =>{
        try {
            const messagedel = await deleteReviews(id);
            reviews = reviews.filter(reviews => reviews._id !==id)
            alert(messagedel)
        } catch (error) {
            alert('Fallo al eliminar la reseña')
        }
    }

    const openEditModal = (service) => {
        // Rellenamos el formulario con los datos del servicio a editar
        editForm = { title: service.title, description: service.description, price: service.price };
        editForm._id = service._id
        showEditModal = true; // Mostrar el modal
    };

    const closeEditModal = () => {
        showEditModal = false; // Cerrar el modal sin guardar
    };

    const openServiceModal = () =>{
        showServiceModal = true;
    }

    const closeServiceModal = () =>{
        showServiceModal = false;
    }

    const saveEdit = async () => {
        try {
            const updatedService = await updateServices(editForm._id, {
                title: editForm.title,
                description: editForm.description,
                price: editForm.price
            });
            // Actualizamos el servicio en el array
            services = services.map(service =>
                service._id === updatedService._id ? updatedService : service
            );
            closeEditModal(); // Cerrar el modal después de guardar
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    function logout() {
    
    localStorage.removeItem('Authtoken');
    window.location.href = '/';
    };

    const openModal = () => {
        showModal = true;
    };

    const closeModal = () => {
        showModal = false;
    };
</script>

<main >
    <div class="flex min-h-screen bg-gray-100">
       <aside class="w-1/4 bg-gray-900 text-white p-4">
        <nav>
            <ul class="flex flex-col gap-6 ">
                <li>
                    <button on:click={goto('/barbershops')}
                    aria-label="goto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 ml-4 mt-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                          </svg>
                    </button>
                </li>
                <li>
                    <button 
                        class="w-full p-2 text-left hover:bg-gray-700 cursor-pointer underline underline-offset-8"
                        class:selected={activeTab === 'appointments'}
                        on:click={() => activeTab = 'appointments'}
                        aria-pressed={activeTab === 'appointments'}>
                        Citas
                    </button>
                </li>
                <li>
                    <button 
                        class="w-full p-2 text-left hover:bg-gray-700 cursor-pointer underline underline-offset-8"
                        class:selected={activeTab === 'servicios'}
                        on:click={() => activeTab = 'servicios'}
                        aria-pressed={activeTab === 'servicios'}>
                        Servicios
                    </button>
                </li>
                <li>
                    <button 
                        class="w-full p-2 text-left hover:bg-gray-700 cursor-pointer underline underline-offset-8"
                        class:selected={activeTab === 'haircuts'}
                        on:click={() => activeTab = 'haircuts'}
                        aria-pressed={activeTab === 'haircuts'}>
                        Peinados
                    </button>
                </li>
                <li>
                    <button 
                        class="w-full p-2 text-left hover:bg-gray-700 cursor-pointer underline underline-offset-8"
                        class:selected={activeTab === 'reviews'}
                        on:click={() => activeTab = 'reviews'}
                        aria-pressed={activeTab === 'reviews'}>
                        Reseñas
                    </button>
                </li>
                
                <li>
                    <button class="w-full p-2 text-left hover:bg-gray-700 cursor-pointer "
                    on:click={logout}>
                        Cerrar sesion
                    </button>
                </li>
            </ul>
        </nav>
    </aside>

    <!-- Contenido -->
    <section class="flex-1 p-4">
        {#if loading}
            <p>Cargando datos...</p>
        {:else}
            {#if activeTab === 'appointments'}
            <h2 class="text-xl font-bold mb-4">Citas</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {#each appointments as { _id,clientname, date, hour, lapsetime }}
                    <div class="bg-white flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664" />
                        </svg>
                        <h3 class="text-lg font-semibold mb-2 mt-2">{clientname}</h3>
                        <p><strong>Fecha:</strong> {new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong>Hora:</strong> {hour}</p>
                        <p><strong>Duración:</strong> {lapsetime} min</p>
                        <button class="bg-red-700 text-white p-2 mt-4 rounded-lg" on:click={() => deleteAppointment(_id)}>Eliminar</button>
                    </div>
                {/each}
            </div>
            <div>
                <button 
                    class="bg-gray-900 text-white p-2 rounded-lg mt-4 fixed bottom-4 right-4"
                    on:click={openModal}>
                    Crear Nueva Cita
                </button>
                <AppoitmentsForm {barbershopid} show={showModal} closeModal={closeModal} />
            </div>
            {/if}
            {#if activeTab === 'servicios'}
                <h2 class="text-xl font-bold mb-4">Servicios</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {#each services as {_id, title,description,price }}
                        <div class="bg-white flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div class="bg-gray-900 flex flex-row justify-around text-white p-1 w-full">
                                <h3 class="text-lg font-semibold mb-2 mt-2">{title}</h3>
                                 <p class="text-lg font-semibold mb-2 mt-2">{price}€</p>
                            </div>
                            <p class="mt-4"> {description}</p>
                            <div class="flex flex-row gap-12">
                                <button class="bg-blue-700 text-white p-2 mt-4 rounded-lg" on:click={() => openEditModal({ _id, title, description, price })}>
                                Editar
                            </button>
                            <button class="bg-red-700 text-white p-2 mt-4 rounded-lg" >Eliminar</button>  
                            </div>
                          
                        </div>
                    {/each}
                </div>
                <div>
                    <button 
                        class="bg-gray-900 text-white p-2 rounded-lg mt-4 fixed bottom-4 right-6"
                        on:click={openServiceModal}>
                        Crear nuevo servicio
                    </button>
                    <ServicesForm {barbershopid} show={showServiceModal} closeModal={closeServiceModal} />
                </div>
                {#if showEditModal} <!-- Solo mostrar el modal si showEditModal es true -->
                    <div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div class="bg-white p-6 rounded-lg w-96">
                            <h3 class="text-xl font-semibold mb-4">Editar Servicio</h3>
                            <form on:submit|preventDefault={saveEdit}>
                                <div class="mb-4">
                                    <label for="title" class="block text-sm font-medium">Título</label>
                                    <input type="text" id="title" bind:value={editForm.title} class="border border-gray-300 p-2 rounded-lg w-full" required />
                                </div>
                                <div class="mb-4">
                                    <label for="description" class="block text-sm font-medium">Descripción</label>
                                    <textarea id="description" bind:value={editForm.description} class="border border-gray-300 p-2 rounded-lg w-full" required></textarea>
                                </div>
                                <div class="mb-4">
                                    <label for="price" class="block text-sm font-medium">Precio (€)</label>
                                    <input type="number" id="price" bind:value={editForm.price} class="border border-gray-300 p-2 rounded-lg w-full" required />
                                </div>
                                <div class="flex justify-between">
                                    <button type="button" class="bg-gray-500 text-white p-2 rounded-lg" on:click={closeEditModal}>Cancelar</button>
                                    <button type="submit" class="bg-green-700 text-white p-2 rounded-lg">Guardar Cambios</button>
                                </div>
                            </form>
                        </div>
                    </div>
                 {/if}
            {/if}

            {#if activeTab === 'haircuts'}
                <h2 class="text-xl font-bold mb-4">Peinados</h2>
                <ul class="grid grid-cols-2 gap-4">
                    {#each haircuts as { images, style ,_id}}
                        <li class="p-4 border shadow rounded">
                            <img src={images} alt={style} class="w-full h-32 object-cover rounded" />
                            <p class="mt-2">{style}</p>
                            <button class="bg-red-700 text-white p-2 mt-4 rounded-lg" on:click={() => deleteHaircut(_id)}>Eliminar</button>
                        </li>
                    {/each}
                </ul>
            {/if}

            {#if activeTab === 'reviews'}
                <h2 class="text-xl font-bold mb-4">Reseñas</h2>
                <ul>
                    {#each reviews as {_id, puntuation, comment, client }}
                    <li class="p-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div class="flex flex-col">
                            <p class="text-lg font-semibold"><strong>Cliente:</strong> {client}</p>
                            <p class="text-sm text-gray-600 mt-2"><strong>Comentario:</strong> {comment}</p>
                            <p class="text-sm text-yellow-500 mt-2"><strong>Puntuación:</strong> {puntuation}</p>
                            <button class="bg-red-700 text-white p-2 mt-4 rounded-lg" on:click={() => deleteReviews(_id)}>Eliminar</button>
                        </div>
                    </li>
                    {/each}
                </ul>
            {/if}
        {/if}
    </section>  
    
    </div><!-- Barra lateral -->
   
    <Footer />
</main>
