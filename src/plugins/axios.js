import axios from "axios"
import router from "@/router/index"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL + '/';    

axios.interceptors.request.use(
    error => {
        return Promise.resolve(error)
    }
)

axios.interceptors.response.use(
    function (response) {
        return response || {}
    },
    function (error) {
        const statusCode = (error.response || {}).status || -1

        if (statusCode === 404) {
            router.push('/')
            return Promise.reject(error)
        }
        return Promise.reject(error)
    }
)