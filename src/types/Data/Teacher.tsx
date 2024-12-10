import { QuizAssign } from "./Quiz"

export type Teacher = {
    email: string
    name: string
    role: string
    image: string
    _id: string
    testList: QuizAssign[]
}

export type TeacherValue={
    email: string
    name: string
    password: string
    image?: string
}