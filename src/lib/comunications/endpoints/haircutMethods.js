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