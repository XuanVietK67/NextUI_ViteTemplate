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

const UpdateStudent=(_id: string, studentInfo: dataUpdateStudent)=>{
    return axios.patch(`students/update?_id=${_id}`, studentInfo)
}
export {
    getListStudent, addNewStudent, getDetailStudent,
    UpdateStudent
}