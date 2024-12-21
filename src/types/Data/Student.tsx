
export type Student = {
    email: string
    name: string
    role: string
    image: string
    testsAssigned: string[]
    testsDone: string[]
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