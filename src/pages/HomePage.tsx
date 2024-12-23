import { getListQuiz } from "@/services/quizService"
import { Quiz } from "@/types/Data/Quiz"
import { Card, CardBody, CardFooter, Image, Pagination, Spinner } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router"
import quiz from '@/quiz.jpg'
import { useAuthStore } from "@/store/AuthStore"
import { getDetailStudent } from "@/services/studentService"
import { FaStar } from "react-icons/fa6"

const HomePage = () => {

    const [currentPage, setCurrentPage] = useState(1)
    // const [pageSize, setPageSize] = useState(8)
    const pageSize = 8
    const { user } = useAuthStore()

    const { data, isFetching, isLoading } = useQuery({
        queryKey: ['fetchingProduct', user],
        queryFn: async () => {
            if (user?.role == 'student') {
                const res = await getDetailStudent(user?._id ? user._id : "")
                return res?.data?.data?.testsAssigned
            }
            else {
                const res = await getListQuiz(currentPage, pageSize)
                return res.data.data
            }
        }
    })

    const navigate = useNavigate();


    const handleDoTest = (test: Quiz) => {
        if (!user) {
            navigate('/login')
        }
        else {
            navigate(`dotest/${test._id}`)
        }
    }

    if (isLoading) {
        return (
            <Spinner size="lg" />
        )
    }

    if (isFetching) {
        return (
            <Spinner size="lg" />
        )
    }


    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block w-full text-center justify-center">
                {
                    user?.role == "student" ?
                        <div className="gap-5 grid grid-cols-2 sm:grid-cols-4 min-w-full">
                            {data &&
                                data?.length > 0 &&
                                data.map((item: Quiz, index: number) => (
                                    <div
                                        className="flex flex-col gap-3 bg-white p-3 cursor-pointer border-1 border-special-gray hover:border-red"
                                        onClick={() => navigate(`/doquiz/${item?._id}`)}
                                        key={`index ${index}`}
                                    >
                                        <div className="flex flex-row justify-center h-full">
                                            <img
                                                src={item?.image}
                                                className="w-1/2 object-center p-5 border-x-3 border-y-1 border-special-gray"
                                            />
                                        </div>
                                        <div className="flex flex-row items-center gap-5">
                                            <p className="flex text-lg font-medium text-red">
                                                {item?.name}
                                            </p>
                                            <p className="bg-slate-100 rounded-md">{item?.level}</p>
                                        </div>
                                        <div className="flex text-gray">{item?.description}</div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="font-sans text-primary font-bold text-lg">
                                                Start Now
                                            </div>
                                            <div className="text-gray">{item?.name}</div>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        :

                        <div className="gap-5 grid grid-cols-2 sm:grid-cols-4 min-w-full">
                            {data?.res &&
                                data?.res?.length > 0 &&
                                data?.res.map((item: Quiz, index: number) => (
                                    <div
                                        className="flex flex-col gap-3 bg-white p-3 cursor-pointer border-1 border-special-gray hover:border-red"
                                        onClick={() => navigate(`/doquiz/${item?._id}`)}
                                        key={`index ${index}`}
                                    >
                                        <div className="flex flex-row justify-center h-full">
                                            <img
                                                src={item?.image}
                                                className="w-1/2 object-center p-5 border-x-3 border-y-1 border-special-gray"
                                            />
                                        </div>
                                        <div className="flex flex-row items-center gap-5">
                                            <p className="flex text-lg font-medium text-red">
                                                {item?.name}
                                            </p>
                                            <p className="bg-slate-100 rounded-md">{item?.level}</p>
                                        </div>
                                        <div className="flex text-gray">{item?.description}</div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="font-sans text-primary font-bold text-lg">
                                                Start Now
                                            </div>
                                            <div className="text-gray">{item?.name}</div>
                                        </div>
                                    </div>
                                ))}
                        </div>

                }

            </div>
        </section>
    )
}

export default HomePage