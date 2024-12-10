import { QuizAssign, QuizDone } from "./Quiz"

export type Student = {
    email: string
    name: string
    role: string
    image: string
    testsAssigned: QuizAssign[]
    testsDone: QuizDone[]
    _id: string
}

export type StudentValue = {
    email: string
    password: string
    name: string
    image?: string
}

export type dataUpdateStudent={
    name?: string
    image?: string
}