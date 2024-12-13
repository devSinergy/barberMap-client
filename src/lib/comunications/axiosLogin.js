import axios from "axios";

const apiLogin = axios.create({
    baseURL:'https://barbermap-server.onrender.com/auth/login',
    timeout:5000,
    headers:{
        'Content-Type':'application/json'
    }
});
apiLogin.interceptors.response.use(
    (response) => {
        return response},
    (error) =>{
        return Promise.reject(error)
    }
)

export default apiLogin;