// @ts-nocheck
import apiUsers from "../axiosUser";

export const createUser = async (formUser) =>{
    try {
        
        const response = await apiUsers.post('/register',formUser)
        return response.data
    } catch (error) {
        throw error
    }
}

export const totalClients = async (barbershopid) =>{
    try {
        const response = await apiUsers.get(`/${barbershopid}`)
        return response.data
    } catch (error) {
        
    }
}

export const deleteClient = async (clientid) =>{
    try {
        const response = await apiUsers.delete(`/clients/${clientid}`)
        return response.data
    } catch (error) {
        throw error
    }
}