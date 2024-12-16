export type Answer = {
    description: string
    correctAnswer: boolean
}


export type Question = {
    description: string
    image: string
    _id: string
    answers: Answer[]
}


export type Quiz = {
    _id: string
    name: string
    description: string
    image: string
    level: string
    teacherId: string
    questions: Question[]
}

export type QuizAssign = {
    _id: string
    image: string
    name: string
    description: string
}

export type QuizValue={
    name: string
    description: string
    level: string
    image: string
    teacherId?: string
}

export type QuizDone = {
    _id: string
    image: string
    name: string
    description: string
    scrore: number
}