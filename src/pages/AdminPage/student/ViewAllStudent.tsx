import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { DeleteIcon, EditIcon, EyeIcon } from "@/components/layout/icons";
import { TableColumn } from "@/types";
import { useNavigate } from "react-router";
import { getListStudent } from "@/services/studentService";
import ITable from "@/components/table/Table";
import { Student } from "@/types/Data/Student";
import { Avatar } from "@nextui-org/react";

const ViewStudentPage = () => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  //   const { setAction } = useUserStore();

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["fetchingUser", page, rowsPerPage],
    queryFn: async () => {
      let res = await getListStudent(page, rowsPerPage);
      console.log("cheeck res: ", res.data.data)
      return res.data.data;
    },
  });

  const handleViewDetailUser = (student: Student) => {
    navigate(`/dashboard/student/action/${student._id}/view`);
  };

  const handleEditUser = (student: Student) => {
    navigate(`/dashboard/student/action/${student._id}/update`);
  };


  const createNewStudent = () => {
    navigate('/dashboard/addnewstudent')
  }

  let columns: TableColumn<Student>[] = [
    {
      key: "name",
      label: "Student Name",
    },
    {
      key: "image",
      label: "Avatar",
      render: (user) => (
        <div className="flex flex-row items-center gap-1">
          <Avatar src={user.image} size="md" />
          <p>{user?.name}</p>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "testsAssigned",
      label: "Test Assigned",
      render: ({ testsAssigned }) => <div>{testsAssigned?.length}</div>,
    },
    {
      key: "testsDone",
      label: "Test Done",
      render: ({ testsDone }) =>
        <div>
          {
            testsDone[testsDone.length-1]?.numberOfQuiz ? testsDone[testsDone.length-1].numberOfQuiz: 0
          }
        </div>,
    },
    {
      key: "action",
      label: "ACTION",
      render: [
        {
          icon: <EyeIcon />,
          onClick: (student) => handleViewDetailUser(student),
          label: "Details",
        },
        {
          icon: <EditIcon />,
          onClick: (User) => handleEditUser(User),
          label: "Edit User",
        },
        {
          icon: <DeleteIcon />,
          label: "Delete User",
          // onClick: (User) => handleDeleteUser(User),
          onClick: (User) => handleEditUser(User),
          color: "danger" as const,
        },
      ],
    },
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
      header
      footer
    // filter={true}
    />
  );
};

export default ViewStudentPage;
