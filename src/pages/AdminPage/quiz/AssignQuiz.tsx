import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { TableColumn } from "@/types";
import { useNavigate, useParams } from "react-router";
import { getListStudent, receiveTest } from "@/services/studentService";
import ITable from "@/components/table/Table";
import { Student } from "@/types/Data/Student";
import { Checkbox, Chip, cn, Link, User } from "@nextui-org/react";
import Loading from "@/components/layout/Loading";

const AssignQuiz = () => {
    const [page, setPage] = useState<number>(1);

    const { id } = useParams()
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const navigate = useNavigate();

    const { data, refetch, isFetching } = useQuery({
        queryKey: ["fetchingUser", page, rowsPerPage],
        queryFn: async () => {
            let res = await getListStudent(page, rowsPerPage);
            return res.data.data;
        },
    });


    const handleAssign = async (student: Student) => {
        const res = await receiveTest(student._id, id ? id : "")
        console.log("check res receive: ", res)
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
                    isSelected={student.testsAssigned.filter((q) => q._id == id).length > 0}
                    onValueChange={() => handleAssign(student)}
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

    if (isFetching) {
        return (
            <Loading />
        )
    }
    else {
        return (
            <ITable<Student>
                data={data}
                columnsFilter={columns}
                //   {columns.filter(
                //     (column) => hidden.includes(column.key as never) === false
                //   )}
                page={page}
                footer
                header
                setPage={setPage}
                showColumnsAction={true}
                columns={columns}
                setRowsPerPage={setRowsPerPage}
                create={createNewStudent}
            // filter={true}
            />
        );
    }


};

export default AssignQuiz;
