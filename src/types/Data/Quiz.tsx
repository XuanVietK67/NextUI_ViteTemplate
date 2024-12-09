export type Answer={
    description: string
    correctAnswer: boolean
}


export type Question={
    description: string
    image: string
    _id: string
    answers: Answer[]
}


export type Quiz={
    _id: string
    name: string
    description: string
    image: string
    level: string
    teacherId: string
    questions: Question[]
}