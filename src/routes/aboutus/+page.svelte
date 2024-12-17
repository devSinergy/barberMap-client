<script>
    const aboutusimg = "images/backgrounds/aboutus.jpg"
    import NavBar from "$lib/components/navBar/navBar.svelte";
</script>
<main>
    <NavBar />
    <section class=" bg-cover flex flex-col bg-center bg-no-repeat min-h-screen items-center justify-center">
      <div>
        <img src={aboutusimg} alt="aboutus">
      </div>  
      <div class="max-w-3xl p-8 bg-white bg-opacity-80 rounded-lg shadow-lg text-gray-800">
        <h1 class="text-4xl font-bold mb-6 text-center underline underline-offset-8">About Us</h1>
        <p class="text-lg leading-relaxed">
          BarberMap es una plataforma creada sin ánimo de lucro con un enfoque
          educativo y didáctico. Este proyecto surge con la idea de facilitar el
          descubrimiento y la conexión entre personas apasionadas por el mundo de
          las barberías. Desarrollado como una iniciativa práctica y formativa,
          nuestro objetivo es proporcionar un recurso accesible que ayude tanto a
          profesionales como a clientes a encontrar y compartir información sobre
          barberías en su área. Creemos que el aprendizaje y la colaboración son
          fundamentales para fortalecer el sector y crear una comunidad donde el
          estilo, la tradición y la innovación puedan crecer juntos. Al ser un
          proyecto sin fines comerciales, nuestro compromiso es brindar una
          experiencia transparente, útil y centrada en las necesidades de nuestros
          usuarios. Gracias por visitar BarberMap y ser parte de esta comunidad
          educativa. ¡Tu apoyo es clave para que sigamos creciendo y mejorando!
        </p>
      </div>
      
    </section>
  </main>
  
