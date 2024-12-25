import ITable from "@/components/table/Table"
import { getDetailUser } from "@/services/studentService"
import { TableColumn } from "@/types"
import { QuizDone } from "@/types/Data/Quiz"
import { useQuery } from "@tanstack/react-query"
import { GiTargetArrows } from "react-icons/gi";

import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { Button } from "@nextui-org/react"
import { getDetailQuiz } from "@/services/quizService"
import { useAuthStore } from "@/store/AuthStore"
import Loading from "@/components/layout/Loading"

const ViewQuizDone = () => {
    const { id, qid } = useParams()
    const [page, setPage] = useState<number>(1);
    const { user } = useAuthStore()
    const location = useLocation()
    const navigate = useNavigate()
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const { data, refetch, isFetching } = useQuery({
        queryKey: ['fetch student info', id, location],
        queryFn: async () => {
            const res = await getDetailUser(id ? id : "")
            return {
                result: res?.data?.data?.testsDone as QuizDone[],
            }
        }
    })

    const { data: quizData } = useQuery({
        queryKey: ['quiz', id, location],
        queryFn: async () => {
            const res = await getDetailQuiz(qid ? qid : "")
            return res?.data?.data
        },
    })


    const handleViewResult = (key: string) => {
        navigate(`/result/${key}/${user?._id ? user._id : ""}/${qid}`)
    }


    let columns: TableColumn<QuizDone>[] = [
        {
            key: 'name',
            label: 'Name'
        },
        {
            key: 'description',
            label: 'Description',
        },
        {
            key: 'score',
            label: 'Score'
        },
        {
            key: 'result',
            label: 'Result',
            render: [
                {
                    icon: <GiTargetArrows size="20" />,
                    label: 'View Result',
                    onClick: ({ key }) => handleViewResult(key),
                    color: 'primary'
                }
            ]
        }
    ]

    useEffect(() => {
        refetch()
    }, [])

    console.log("check data: ", data)

    if (isFetching) {
        return (
            <Loading />
        );
    }
    else {
        return (
            <div className="flex flex-col">
                {
                    data?.result?.length && data.result.length > 0 ?
                        <ITable<QuizDone>
                            data={data}
                            columnsFilter={columns}
                            page={page}
                            setPage={setPage}
                            showColumnsAction={true}
                            columns={columns}
                            setRowsPerPage={setRowsPerPage}
                            create={() => { return }}
                        />
                        :
                        <div>Your first time</div>
                }

                <div className="flex justify-end gap-3 items-center">
                    <Button
                        color="secondary"
                        onClick={() => navigate(`/doquiz/${qid ? qid : ""}`)}
                    >
                        {data?.result?.length && data.result.length > 0 ? `Retry ${quizData?.name}` : "Start"}
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => navigate(`/`)}
                    >
                        Return
                    </Button>
                </div>
            </div>
        )
    }

}

export default ViewQuizDone