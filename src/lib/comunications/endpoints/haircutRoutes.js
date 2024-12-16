import apiHaircut from "../axiosHaircut";

export const getHaircut = async() =>{
    try {
        const response = await apiHaircut.get('/');
        return response.data
    } catch (error) {
        console.error('Error al obtener barberos:', error);
        throw error; 
    }
}

export const getStoreHaircut = async(/** @type {any} */ barbershopid) =>{
    try {
        const response = await apiHaircut.get(`/${barbershopid}`)
        return response.data
    } catch (error) {
        console.error('Error al obtener peinados:', error);
    }
}

export const deleteHaircut = async(/** @type {any} */ id)=>{
    try {
        const response = await apiHaircut.delete(`/${id}`);
        const message = response.data.message
        return message
    } catch (error) {
        throw error
    }
}