import apiLogin from "../axiosLogin";

export const sendForm = async (/** @type {{ phonenumber: Number; password: string; }} */ formData) =>{
    const response = await apiLogin.post('/login',formData);
    return response.data
}