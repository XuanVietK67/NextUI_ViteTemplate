import axios from '@/utils/AxiosCustomize'


const getListQuiz=(current: number, pageSize: number)=>{
    return axios.get(`quizzs?current=${current}&pageSize=${pageSize}`)
}

export {
    getListQuiz
}