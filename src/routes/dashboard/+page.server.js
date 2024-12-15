// @ts-nocheck
import { JWTSECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function load() {
    let barbershopid = null;

    // Verifica si estamos en el navegador
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('Authtoken');
        if (token) {
            try {
                const decoded = jwt.decode(token, JWTSECRET);
                barbershopid = decoded?.barbershopid || null;
            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }
        }
    }

    return barbershopid;
}