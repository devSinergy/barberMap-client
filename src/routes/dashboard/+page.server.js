// @ts-nocheck
// src/routes/dashboard/+page.server.js

// import { redirect } from '@sveltejs/kit';  // Para redirigir

// /** 
//  * La función `load` debe devolver un objeto que puede contener `props`, `status` o `redirect`.
//  * Si el usuario no está autenticado, puedes redirigirlo con `redirect`.
//  */
// export async function load({ locals }) {
//     if (!locals.user) {
//         // Si no hay usuario, redirige a la página de login.
//         throw redirect(302, '/login');
//     }

//     // Si el usuario está autenticado, retorna sus datos como props
//     return {
//         props: {
//             user: locals.user
//         }
//     };
// }

