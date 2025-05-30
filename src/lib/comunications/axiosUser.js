import axios from "axios";

const apiUsers = axios.create({
    baseURL:'https://barbermap-server.onrender.com/user',
    // baseURL:'http://localhost:3000/user',
    timeout:5000,
    headers:{
        'Content-Type':'application/json'
    }
});

apiUsers.interceptors.response.use(
    (response) =>{
        return response},
    (error) =>  { 
        return Promise.reject(error)
    }
)

export default apiUsers;