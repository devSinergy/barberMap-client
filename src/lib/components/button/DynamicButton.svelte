<script>
  export let text = "Botón"; // Texto del botón
  export let onClick = () => {}; // Acción al hacer clic
</script>

<button on:click={onClick} class="barber-chair-button">
  {text}
</button>

<style>
  .barber-chair-button {
    /* Tamaño y forma */
    display: inline-block;
    width: 100%;
    padding: 12px 24px;
    border-radius: 1px;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    cursor: pointer;
    position: relative;

    /* Fondo simula cuero tapizado */
    background: linear-gradient(145deg, #614a3e, #3d3029);
    background-size: 100% 100%;
    box-shadow:
      inset -4px -4px 14px rgba(255, 255, 255, 0.3),
      /* Luz interior */ inset 4px 4px 10px rgba(0, 0, 0, 0.5),
      /* Sombra interior */ 4px 4px 12px rgba(0, 0, 0, 0.2); /* Sombra exterior */
    border: 4px solid;
    border-image: linear-gradient(45deg, #bbb, #fff, #aaa) 1; /* Borde cromado */
    transition: all 0.3s ease;
  }

  /* Interactividad */
  .barber-chair-button:hover {
    background: linear-gradient(145deg, #736057, #463e37);
    box-shadow:
      inset -2px -2px 8px rgba(255, 255, 255, 0.2),
      inset 2px 2px 8px rgba(0, 0, 0, 0.6),
      6px 6px 16px rgba(0, 0, 0, 0.3);
  }

  .barber-chair-button:active {
    transform: scale(0.98); /* Simula presión */
    box-shadow:
      inset -4px -4px 12px rgba(255, 255, 255, 0.2),
      inset 4px 4px 12px rgba(0, 0, 0, 0.6),
      2px 2px 8px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    .barber-chair-button {
      font-size: 1.2rem;
      padding: 4px 32px;
      width: auto;
      border-radius: 4px;
    }
  }
</style>
