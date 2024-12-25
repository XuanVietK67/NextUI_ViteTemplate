import { dataUpdateStudent, StudentValue } from '@/types/Data/Student'
import axios from '@/utils/AxiosCustomize'

const getListStudent = (page: number, rowsPerPage: number) => {
    return axios.get(`students/getSome?current=${page}&pageSize=${rowsPerPage}`)
}

const addNewStudent = (studentInfo: StudentValue) => {
    return axios.post('students', studentInfo)
}

const getDetailStudent = (_id: string) => {
    return axios.get(`students/detail?_id=${_id}`)
}

const getDetailUser = (_id: string) => {
    return axios.get(`students/detail/user?_id=${_id}`)
}

const UpdateStudent=(_id: string, studentInfo: dataUpdateStudent)=>{
    return axios.patch(`students/update?_id=${_id}`, studentInfo)
}

const receiveTest=(sId: string, qId: string)=>{
    return axios.get(`students/receive?sId=${sId}&qId=${qId}`)
}

const getResultQuiz=(sId: string, key: string)=>{
    return axios.get(`students/viewResult?sid=${sId}&key=${key}`)
}


export {
    getListStudent, addNewStudent, getDetailStudent,
    UpdateStudent, receiveTest, getDetailUser, getResultQuiz
}