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

export const deleteApppoitmens = async(id) =>{
    try {
        const response = await apiAppoitmens.delete(`/${id}`)
        const message = response.data.message
        return message
    } catch (error) {
        
    }
}

export const createAppoitmens = async(formData, barbershopid) =>{
    try {
        const payload = {...formData,barbershopid}
        const response = await apiAppoitmens.post('/',payload);
        return response.data
    } catch (error) {
        throw error
    }
}