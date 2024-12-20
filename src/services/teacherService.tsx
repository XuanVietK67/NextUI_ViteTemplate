import { TeacherValue } from '@/types/Data/Teacher'
import axios from '@/utils/AxiosCustomize'

const getListTeacher = (page: number, rowsPerPage: number) => {
    return axios.get(`teacher/getSome?current=${page}&pageSize=${rowsPerPage}`)
}

const addNewTeacher = (teacherInfo: TeacherValue) => {
    return axios.post('teacher', teacherInfo)
}

const getDetailTeacher = (_id?: string) => {
    return axios.get(`teacher/detail?_id=${_id}`)
}

const UpdateTeacher = (_id: string, data: TeacherValue) => {
    return axios.patch(`teacher/update?_id=${_id}`, data)
}

const getAllQuizOfTeacher = (_id: string, current: number, pageSize: number) => {
    return axios.get(`quizzs/byTeacherId?_id=${_id}&current=${current}&pageSize=${pageSize}`)
}
export {
    getListTeacher, addNewTeacher, getDetailTeacher,
    UpdateTeacher, getAllQuizOfTeacher
}