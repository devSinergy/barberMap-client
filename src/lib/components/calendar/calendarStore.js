import { writable } from 'svelte/store';

// Store para la fecha seleccionada, inicializada en null o una fecha por defecto
export const selectedDate = writable(null);
