import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { DeleteIcon, EditIcon, EyeIcon } from "@/components/layout/icons";
import { TableColumn } from "@/types";
import { useNavigate, useParams } from "react-router";
import { getListStudent, receiveTest } from "@/services/studentService";
import ITable from "@/components/table/Table";
import { Student } from "@/types/Data/Student";
import { Avatar, Checkbox, Chip, cn, Link, User } from "@nextui-org/react";

const AssignQuiz = () => {
    const [page, setPage] = useState<number>(1);
    const [isSelected, setIsSelected] = useState<boolean>(false)

    const {id}=useParams()
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    //   const { setAction } = useUserStore();

    const navigate = useNavigate();

    const { data, refetch } = useQuery({
        queryKey: ["fetchingUser", page, rowsPerPage],
        queryFn: async () => {
            let res = await getListStudent(page, rowsPerPage);
            console.log("cheeck res: ", res.data.data)
            return res.data.data;
        },
    });


    const handleAssign=async (student: Student)=>{
        const res=await receiveTest(student._id, id? id: "")
        console.log("check res receive: ",res)
        refetch()
    }


    const createNewStudent = () => {
        navigate('/dashboard/addnewstudent')
    }

    let columns: TableColumn<Student>[] = [
        {
            key: "student",
            label: 'STUDENT',
            render: (student) => (
                <Checkbox
                    aria-label={student.name}
                    classNames={{
                        base: cn(
                            "inline-flex w-full max-w-md bg-content1",
                            "hover:bg-content2 items-center justify-start",
                            "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                            "data-[selected=true]:border-primary",
                        ),
                        label: "w-full",
                    }}
                    isSelected={student.testsAssigned.includes(id as string)}
                    onValueChange={()=>handleAssign(student)}
                >
                    <div className="w-full flex justify-between gap-2">
                        <User
                            avatarProps={{ size: "md", src: student.image }}
                            description={
                                <Link isExternal href={""} size="sm">
                                    {student.email}
                                </Link>
                            }
                            name={student.name}
                        />
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-tiny text-default-500">{student.role}</span>
                            <Chip color="success" size="sm" variant="flat">
                                Available
                            </Chip>
                        </div>
                    </div>
                </Checkbox>
            )
        },
        {
            key: "testAssign",
            label: 'Test Assigned',
            render: (student) => (
                <div>
                    {student?.testsAssigned?.length}
                </div>
            )
        },
        {
            key: "testDone",
            label: 'Test Done',
            render: (student) => (
                <div>
                    {student?.testsDone?.length}
                </div>
            )
        }
    ];


    // console.log("check main column: ", columns);
    // console.log("check hidden: ", hidden);
    return (
        <ITable<Student>
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
            create={createNewStudent}
        // filter={true}
        />
    );
};

export default AssignQuiz;
