export type Answer = {
    description: string
    correctAnswer: boolean
}


export type Question = {
    description: string
    image?: string
    answers: Answer[]
}

export type Score={
    result: string[]
    _id: string
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

export type QuizValue = {
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

export type dataUpdateQuiz = {
    image: string
    name: string
    description: string
    level: string
    questions: Question[]
}

export type dataUpdateQuestion = {
    _id: string
    index: number
    question: Question
}