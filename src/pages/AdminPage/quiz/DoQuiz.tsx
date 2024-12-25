
import { getDetailQuiz, Grading } from "@/services/quizService"
import { useAuthStore } from "@/store/AuthStore"
import { Answer, Question, Quiz } from "@/types/Data/Quiz"
import { Button } from "@nextui-org/button"
import { Checkbox } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"


const DoQuiz = () => {

    const { id } = useParams()
    const location = useLocation();
    const { user } = useAuthStore()


    const [quiz, setQuiz] = useState<Quiz>()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [questions, setQuestions] = useState<Array<Question>>([])
    const [time, setTime] = useState(1000)

    const navigate=useNavigate()

    const { data } = useQuery({
        queryKey: ['quiz', id],
        queryFn: async () => {
            const res = await getDetailQuiz(id ? id : "")
            setQuiz(res?.data?.data)
            setQuestions(res?.data?.data?.questions)
            return res?.data?.data
        },
    })

    useEffect(() => {
        if (time === 0) return;
        setTimeout(() => setTime(time - 1), 1000)
    }, [time])

    const handleChooseAnswer = (event: any, index: number) => {
        console.log(event.target.checked, index)
        let coppy = questions ? questions : []
        coppy[currentQuestion].answers[index].correctAnswer = event.target.checked
        setQuestions([...coppy])
    }


    const handleFinishQuiz = async () => {
        let result = [""]
        quiz?.questions.forEach((items: any, index: number) => {
            let answer = items.answers
            let correct = ""
            answer.forEach((ans: any, answerIndex: number) => {
                if (ans.correctAnswer === true) {
                    correct = correct + answerIndex
                }
            })
            result[index] = correct
        })
        const dataGrading = { result, _id: id ? id : "" }
        await Grading(dataGrading, user?._id ? user._id : "")
        navigate('/')
    }

    if(data?.questions.length==0){
        return(
            <div>
                This quiz has no question
            </div>
        )
    }
    return (
        <div className='flex flex-row'>
            <div className='flex flex-col gap-5 w-3/4'>
                <div className='text-7xl font-bold text-primary flex flex-row justify-center items-center'>
                    {data?.name}
                    <div className='flex justify-center'>
                        {
                            data?.questions[currentQuestion].image
                                ?
                                <img src={data?.questions[currentQuestion]?.image} className="w-32 h-32" />
                                :
                                <div className="w-32 h-32"></div>
                        }
                    </div>
                </div>
                <div className="border-1 border-special-gray rounded-md pt-20">
                    <div className='flex justify-center text-4xl mb-20'>
                        Question {currentQuestion + 1}: {quiz?.questions[currentQuestion].description}
                    </div>

                    <div className="ml-20 flex flex-col mb-20 gap-5">
                        {
                            data?.questions[currentQuestion].answers.length > 0
                            && questions[currentQuestion].answers.map((answer: Answer, index: number) => {
                                return (
                                    <div key={index} className="flex flex-row gap-3 items-center text-xl">
                                        <Checkbox
                                            onChange={(event) => handleChooseAnswer(event, index)}
                                            isSelected={answer.correctAnswer}
                                        />
                                        <p>
                                            {answer.description}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex justify-center gap-3'>
                    {
                        currentQuestion > 0 &&
                        <Button size='sm' color="secondary" onClick={() => setCurrentQuestion(currentQuestion - 1)}>Prev</Button>
                    }
                    {
                        currentQuestion < data?.questions?.length - 1 &&
                        <Button size='sm' color="primary" onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</Button>
                    }
                    {
                        currentQuestion === data?.questions.length - 1 &&
                        <Button color='primary' size="sm" onClick={() => handleFinishQuiz()}>Finish</Button>
                    }
                </div>
            </div>
            <div className="w-1/4">
                <div className="flex flex-row justify-center mb-10">
                    <div className='rounded-xl p-3 bg-green-500' onClick={() => handleFinishQuiz()}>
                        <p className="text-white">
                            {new Date(time * 1000).toISOString().substr(11, 8)}
                        </p>
                        <div className="text-white">End Exam</div>
                    </div>
                </div>

                <div className='flex flex-row p-2 border-1 flex-wrap mr-1 rounded-md border-special-gray'>
                    {
                        quiz?.questions.map((items: any, index: number) => {
                            return (
                                <div key={`${items.description}-${index}`}
                                    className='rounded-full px-5 py-3'
                                    onClick={() => setCurrentQuestion(index)}
                                    style={index === currentQuestion ? { backgroundColor: '#1fb5cb', color: 'white' } : {}}
                                >
                                    {index + 1}
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div >
        // <div>
        //     hellp
        // </div>
    )
}

export default DoQuiz