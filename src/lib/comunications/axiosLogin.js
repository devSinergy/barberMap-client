import axios from "axios";

axios.defaults.withCredentials = true;

const apiLogin = axios.create({
    baseURL:'http://localhost:3000/auth/login',
    timeout:5000,
    headers:{
        'Content-Type':'application/json'
    },
});
apiLogin.interceptors.response.use(
    (response) => {
        return response},
    (error) =>{
        return Promise.reject(error)
    }
)

export default apiLogin;