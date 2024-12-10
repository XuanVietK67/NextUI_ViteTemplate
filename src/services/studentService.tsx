import { StudentValue } from '@/types/Data/Student'
import axios from '@/utils/AxiosCustomize'

const getListStudent=(page: number,rowsPerPage: number)=>{
    return axios.get(`students/getSome?current=${page}&pageSize=${rowsPerPage}`)
}

const addNewStudent=(studentInfo: StudentValue)=>{
    return axios.post('students',studentInfo)
}

export {
    getListStudent, addNewStudent
}