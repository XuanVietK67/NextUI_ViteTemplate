import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { Spinner } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputCustom from "@/components/custom/Input";
import UploadCustom from "@/components/custom/Upload";
import { getDetailStudent, getDetailUser, UpdateStudent } from "@/services/studentService";
import { StudentValue } from "@/types/Data/Student";
import { useAuthStore } from "@/store/AuthStore";
import ITable from "@/components/table/Table";
import { QuizDone } from "@/types/Data/Quiz";
import { GiTargetArrows } from "react-icons/gi";
import { TableColumn } from "@/types";
import { useState } from "react";



const StudentAction = () => {
    const { id, action } = useParams();
    const { user } = useAuthStore()
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const { data, isFetching, isLoading } = useQuery({
        queryKey: ["userDetail", id],
        queryFn: async () => {
            const res = await getDetailStudent(id ? id : "");
            return res.data.data;
        },
    });

    const { data: StudentData } = useQuery({
        queryKey: ['fetch student info', id],
        queryFn: async () => {
            const res = await getDetailStudent(id ? id : "")
            return {
                result: res?.data?.data?.testsDone as QuizDone[],
            }
        }
    })

    const navigate = useNavigate();

    let studentSchema = object({
        name: string().required("name is not empty"),
        email: string().required("email cannot be empty"),
        image: string(),
        role: string(),
        _id: string()
    });

    const { handleSubmit, control } = useForm({
        defaultValues: {
            name: "",
            email: "",
            image: "",
        },
        values: {
            ...data,
        },
        resolver: yupResolver(studentSchema),
        mode: "all",
    });
    const Update = useMutation({
        mutationFn: async (dataUpdate: StudentValue) => {
            const res = await UpdateStudent(id ? id : "", dataUpdate);
            console.log("check res: ", res)
        },
        onSuccess: () => {
            navigate("/dashboard/student/viewall");
        },
    });

    const onSubmit = (dataa: any) => {
        console.log("check dataa: ", dataa)
        const dataUpdate = { name: dataa.name, image: dataa.image }
        Update.mutate(dataUpdate as StudentValue);
    };
    const handleViewResult = (key: string, qid: string) => {
        navigate(`/result/${key}/${id}/${qid}`)
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
                    onClick: ({ key, _id }) => handleViewResult(key, _id),
                    color: 'primary'
                }
            ]
        }
    ]

    if (isLoading) {
        return <Spinner size="lg" />;
    }

    if (isFetching) {
        return <Spinner size="lg" />;
    }

    return (
        <div className="overflow-hidden">
            <div className="">
                <h1 className="font-medium text-4xl text-[#0369a1]">
                    {action == "view" ? "Student Details" : "Update Student"}
                </h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-12 mt-4"
            >
                <InputCustom<StudentValue> control={control} name="email" label="Email" />

                <InputCustom<StudentValue>
                    control={control}
                    name="name"
                    placeholder="student name"
                    label="Name"

                />
                <UploadCustom control={control} name="image" />

                <div>
                    {
                        action == 'view' && user?.role == 'teacher'
                        &&
                        <ITable<QuizDone>
                            data={StudentData}
                            columnsFilter={columns}
                            page={page}
                            setPage={setPage}
                            showColumnsAction={true}
                            columns={columns}
                            setRowsPerPage={setRowsPerPage}
                            create={() => { return }}
                        />
                    }
                </div>
                <div className="flex justify-end gap-3">
                    <Button
                        color="secondary"
                        onClick={() => navigate("/dashboard/student/viewall")}
                    >
                        Return
                    </Button>
                    {action == "view" ? (
                        ""
                    ) : (
                        <div>
                            <Button type="submit" color="danger">
                                Update
                            </Button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default StudentAction;
