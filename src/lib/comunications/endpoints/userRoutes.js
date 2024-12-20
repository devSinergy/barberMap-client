// @ts-nocheck
import apiUsers from "../axiosUser";

export const createUser = async (formUser,barbershopid) =>{
    try {
        const token = localStorage.getItem('Authtoken');
        const response = await apiUsers.post(`/${barbershopid}`,formUser,{
            headers: {
                authorization: `Bearer ${token}`, // Incluye el token en los headers
            },
        })
        return response.data
    } catch (error) {
        throw error
    }
}