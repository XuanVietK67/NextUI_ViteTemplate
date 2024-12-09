import { DataLogin, DataRegister } from '@/types/Data/User'
import axios from '@/utils/AxiosCustomize'

const PostLogin = (data: DataLogin) => {
    return axios.post('auth/login', data)
}

const PostRegister = (data: DataRegister) => {
    return axios.post('auth/register', data)
}

export {
    PostLogin, PostRegister
}