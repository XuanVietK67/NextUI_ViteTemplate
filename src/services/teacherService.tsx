import { TeacherValue } from '@/types/Data/Teacher'
import axios from '@/utils/AxiosCustomize'

const getListTeacher=(page: number, rowsPerPage: number)=>{
    return axios.get(`teacher/getSome?current=${page}&pageSize=${rowsPerPage}`)
}

const addNewTeacher=(teacherInfo: TeacherValue)=>{
    return axios.post('teacher', teacherInfo)
}
export {
    getListTeacher,addNewTeacher
}