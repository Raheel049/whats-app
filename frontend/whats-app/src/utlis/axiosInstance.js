import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        "Content-Type": "application/json"
    } 

});

axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            if(window.Clerk && window.Clerk.session){
                const token = await window.Clerk.session.getToken();
                if(token){
                    config.headers.Authorization = `Bearer ${token}`
                }

            }
        } catch (error) {
            toast.error("Error featching Clerk token from Axios")
            console.log(error)
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance