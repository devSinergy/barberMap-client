<script>
    import NavBar from "$lib/components/navBar/navBar.svelte";
    import Footer from "$lib/components/footer/footer.svelte";
    const fondoContacto = "images/backgrounds/contacto.png"
</script>
<main>
    <NavBar />
   <section class="flex flex-col items-center mt-6 w-[90%] ml-5">
    <div>
        <h1 class="text-2xl font-bold underline underline-offset-8">Contacto</h1>
    </div>
    <div class="bg-gray-900 mt-6 rounded-lg w-[90%]">
        <img class="hover:scale-150"  src={fondoContacto} alt="fondo">
    </div>
    <div class="text-gray-900 mt-4 font-">
        <h1 class="font-bold text-[40px] ">Eduardo Silva</h1>
        <h3 class="font-bolt text-2xl  ">Director de producción</h3>
        <div class="flex flex-row align-top gap-5 mt-8 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-blue-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
            </svg>     
            <p>627339450</p>         
        </div>
        <div class="flex flex-row align-top gap-5 mt-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-red-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            <p><a href="mailto:eduardofullstackcs@gmail.com" class="text-blue-500 underline">eduardofullstackcs@gmail.com</a></p>
              
        </div>
    </div>
   </section> 
   <Footer />
</main>
