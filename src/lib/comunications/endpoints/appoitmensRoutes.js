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