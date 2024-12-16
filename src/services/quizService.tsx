import { QuizValue } from '@/types/Data/Quiz'
import axios from '@/utils/AxiosCustomize'


const getListQuiz=(current: number, pageSize: number)=>{
    return axios.get(`quizzs?current=${current}&pageSize=${pageSize}`)
}

const createNewQuiz=(dataCreate: QuizValue)=>{
    return axios.post('quizzs',dataCreate)
}

export {
    getListQuiz, createNewQuiz
}