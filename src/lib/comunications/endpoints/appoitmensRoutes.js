// @ts-nocheck
import apiAppoitmens from "../axiosAppoitmens";
/** @param {string} barbershopid */

export const showAppoitmens = async(barbershopid) =>{
    try {
        const response = await apiAppoitmens(`/${barbershopid}`);
        return response.data
    } catch (error) {
        console.error('Fallo al obtener las Citas', error);
        throw error;
    }
}

export const deleteApppoitmens = async (id) => {
    try {
        const token = localStorage.getItem('Authtoken'); // Obtén el token del localStorage
        const response = await apiAppoitmens.delete(`/${id}`, {
            headers: {
                authorization: `Bearer ${token}`, // Incluye el token en los headers
            },
        });
        const message = response.data.message;
        return message;
    } catch (error) {
        console.error('Error al eliminar la cita:', error.response?.data || error.message);
        throw error; // Opcional: lanzar el error para manejarlo en el llamado
    }
};

export const createAppoitmens = async(formData, barbershopid) =>{
    try {
        const token = localStorage.getItem('Authtoken');
        const payload = {...formData,barbershopid}
        const response = await apiAppoitmens.post('/',payload, {
            headers: {
                authorization: `Bearer ${token}`, // Incluye el token en los headers
            },
        });
        return response.data
    } catch (error) {
        throw error
    }
}