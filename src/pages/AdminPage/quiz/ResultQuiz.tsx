import { getQuizDetail } from "@/services/quizService"
import { getResultQuiz } from "@/services/studentService"
import { useAuthStore } from "@/store/AuthStore"
import { Question } from "@/types/Data/Quiz"
import { Button, Card, Checkbox, Skeleton } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { useLocation, useNavigate, useParams } from "react-router"
import { TiTickOutline } from "react-icons/ti";


const ResultQuiz = () => {

    const { key, studentId, qid } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useAuthStore()

    const { data, isFetching: FetchResultQuiz } = useQuery({
        queryKey: ['fetch result', key, location],
        queryFn: async () => {
            const res = await getResultQuiz(studentId ? studentId : "", key ? key : "")
            return res?.data?.data
        }
    })


    const { data: QuizData, isFetching } = useQuery({
        queryKey: ['fetchQuiz', key, location],
        queryFn: async () => {
            const res = await getQuizDetail(qid ? qid : "")
            return res.data.data
        }
    })

    const handleReturn = () => {
        if (user?.role == 'student') {
            navigate(`/viewquiz/${user._id}/${qid}`)
        }
        else {
            navigate(`/dashboard/student/action/${studentId}/view`)
        }
    }


    console.log("chek quix: ", QuizData)
    if (isFetching || FetchResultQuiz) {
        return (
            <Card className="w-full h-full space-y-5 p-4" radius="lg">
                <Skeleton className="rounded-lg">
                    <div className="h-[30vh] rounded-lg bg-default-300" />
                </Skeleton>
                <div className="space-y-3">
                    <Skeleton className="w-full rounded-lg">
                        <div className="h-[5vh] w-full rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-full rounded-lg">
                        <div className="h-[5vh] w-full rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-full rounded-lg">
                        <div className="h-[5vh] w-full rounded-lg bg-default-300" />
                    </Skeleton>
                </div>
            </Card>
        );
    }
    else {
        return (
            <div className='flex flex-col justify-center items-center gap-3'>
                <div className="text-7xl font-bold text-primary">
                    Result {data?.name}
                </div>
                <div className="text-3xl font-semibold text-rose-400">
                    {
                        user?.role == 'student' ?
                            `Student ${user?.username}` : ""
                    }
                </div>
                <div className="w-full flex flex-col gap-5">
                    {
                        QuizData && QuizData.questions && QuizData.questions.length > 0
                        && QuizData.questions.map((q: Question, index: number) => {
                            return (
                                <div key={index} className="flex flex-col gap-2">
                                    <p className="text-3xl font-normal text-blue-300">{`Question ${index + 1}: ${q.description}`}</p>
                                    <div className="flex flex-col gap-1">
                                        {
                                            data?.result && data?.result?.length > 0
                                            && q.answers.map((a: any, aindex: number) => {
                                                return (
                                                    <div key={aindex} className="flex flex-row gap-3 text-xl items-center">
                                                        <Checkbox
                                                            color="secondary"
                                                            isSelected={
                                                                // aindex == data?.result[index]?.studentAnswer ? +data.result[index].studentAnswer : -1
                                                                data?.result[index]?.studentAnswer == '' ? false : aindex == +data?.result[index].studentAnswer
                                                            }
                                                        />
                                                        <p>
                                                            {a.description}
                                                        </p>
                                                        <div>
                                                            {
                                                                !!a.correctAnswer == true ?
                                                                    <TiTickOutline size={20} color="green" />
                                                                    :
                                                                    ""
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex justify-end">
                    <Button color="secondary" onClick={() => handleReturn()}>Return</Button>
                </div>
            </div>
        )
    }


}

export default ResultQuiz