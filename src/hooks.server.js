// @ts-nocheck
// src/hooks.server.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRETKEY = process.env.JWTSECRET;

export async function handle({ event, resolve }) {
    const token = event.cookies.get('token'); // Obtén el token de las cookies
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRETKEY);
            event.locals.user = {
                barbershopid: decoded.barbershopid,
                role: decoded.role
            } // Almacena los datos del usuario en `event.locals`
        } catch (error) {
            console.error('Token inválido o expirado:', error);
            event.locals.user = null; // Limpia los datos del usuario si el token es inválido
        }
    } else {
        event.locals.user = null; // No hay token, usuario no autenticado
    }
    return resolve(event); // Resuelve la solicitud
}
