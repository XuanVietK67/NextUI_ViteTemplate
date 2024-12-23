import { dataUpdateQuiz, QuizValue, Score } from '@/types/Data/Quiz'
import axios from '@/utils/AxiosCustomize'


const getListQuiz = (current: number, pageSize: number) => {
    return axios.get(`quizzs?current=${current}&pageSize=${pageSize}`)
}

const createNewQuiz = (dataCreate: QuizValue) => {
    return axios.post('quizzs', dataCreate)
}

const getQuizDetail = (_id: string) => {
    return axios.get(`quizzs/getOne?_id=${_id}`)
}


const updateQuiz = (_id: string, dataUpdateQuiz: dataUpdateQuiz) => {
    return axios.patch(`quizzs/update?_id=${_id}`, dataUpdateQuiz)
}

const getDetailQuiz = (_id: string) => {
    return axios.get(`quizzs/getOne/noCorrectAnswer?_id=${_id}`)
}

const Grading = (answer: Score) => {
    return axios.post(`quizzs/score`, answer)
}

export {
    getListQuiz, createNewQuiz, getQuizDetail,
    updateQuiz, getDetailQuiz, Grading
}