import { DeleteIcon, EditIcon, EyeIcon } from "@/components/layout/icons"
import ITable from "@/components/table/Table"
import { getListQuiz } from "@/services/quizService"
import { getAllQuizOfTeacher } from "@/services/teacherService"
import { useAuthStore } from "@/store/AuthStore"
import { TableColumn } from "@/types"
import { Quiz } from "@/types/Data/Quiz"
import { Avatar } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router"

const ViewAllQuiz = () => {

    const navigate = useNavigate()
    const { user } = useAuthStore()

    const [page, setPage] = useState<number>(1)
    const [rowsPerPage, setRowsPerPage] = useState<number>(5)

    const { data } = useQuery({
        queryKey: ['quiz', page, rowsPerPage],
        queryFn: async () => {
            // const res = await getAllQuizOfTeacher(user?._id ? user._id : "")
            const res = await getAllQuizOfTeacher(user?._id ? user._id : "", page, rowsPerPage)
            console.log("check res dataaaa: ", res)
            return res.data.data
        }
    })

    const handleViewDetail = (quiz: Quiz) => {

    }

    const handleEdit = (quiz: Quiz) => {
        navigate(`/dashboard/quiz/edit/${quiz._id}`)
    }

    const CreateNewQuiz = () => {
        navigate('/dashboard/quiz/create')
    }

    let columns: TableColumn<Quiz>[] = [
        {
            key: "name",
            label: "Quiz Name",
        },
        {
            key: "image",
            label: "Image",
            render: (quiz) => (
                <div className="flex flex-row items-center gap-1">
                    <Avatar src={quiz.image} size="md" />
                    <p className="text-xs">{quiz?.name}</p>
                </div>
            ),
        },
        {
            key: "description",
            label: "Description",
        },
        {
            key: "level",
            label: "Level",
        },
        {
            key: "action",
            label: "ACTION",
            render: [
                {
                    icon: <EditIcon />,
                    onClick: (quiz) => handleEdit(quiz),
                    label: "Edit Quiz",
                },
                {
                    icon: <DeleteIcon />,
                    label: "Delete Quiz",
                    // onClick: (User) => handleDeleteUser(User),
                    onClick: (User) => handleEdit(User),
                    color: "danger" as const,
                },
            ],
        },
    ];
    console.log("check data: ", data)
    return (
        <ITable<Quiz>
            data={data}
            columnsFilter={columns}
            //   {columns.filter(
            //     (column) => hidden.includes(column.key as never) === false
            //   )}
            page={page}
            setPage={setPage}
            showColumnsAction={true}
            columns={columns}
            setRowsPerPage={setRowsPerPage}
            create={CreateNewQuiz}
        // filter={true}
        />
    )
}

export default ViewAllQuiz