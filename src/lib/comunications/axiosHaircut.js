import axios from "axios";

const apiHaircut = axios.create({
    baseURL:'http://localhost:3000/haircut',
    timeout:5000,
    headers:{
        'Content-Type':'application/json'
    }
});
apiHaircut.interceptors.response.use(
    (response) => {
        return response},
    (error) =>{
        return Promise.reject(error)
    }
)

export default apiHaircut;