import axios from "axios";

const apiService = axios.create({
    baseURL:'http://localhost:3000/services',
    timeout:5000,
    headers:{
        'Content-Type':'application/json'
    }
});

apiService.interceptors.response.use(
    (response) =>{
        return response },
    (error) =>{
        return Promise.reject(error)}

)

export default apiService;