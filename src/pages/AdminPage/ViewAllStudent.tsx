import { useQuery } from "@tanstack/react-query";

import React, { useCallback, useState } from "react";
import { DeleteIcon, EditIcon, EyeIcon } from "@/components/layout/icons";
import { TableColumn } from "@/types";
import { useNavigate } from "react-router";
import { User } from "@/types/Data/User";
import { getListStudent } from "@/services/studentService";
import ITable from "@/components/table/Table";
import { Student } from "@/types/Data/Student";
// import ITable from "@/components/Table";
// import Table from '@/components/Table'

const ViewStudentPage = () => {
  const [page, setPage] = useState<number>(1);
  console.log(page);
  const rowsPerPage = 5;
//   const { setAction } = useUserStore();

  const navigate = useNavigate();

  const { data, isFetching, isPending, isLoading, refetch } = useQuery({
    queryKey: ["fetchingUser", page, rowsPerPage],
    queryFn: async () => {
      let res = await getListStudent(page, rowsPerPage);
      // let result=res.data.data
      // result.result.testsAssigned=res?.data?.data?.result?.testsAssigned?.length
      // result.result.testsDone=res?.data?.data?.result?.testsDone?.length
      console.log("cheeck res: ",res.data.data)
      return res.data.data;
    },
  });

  // const Delete = useMutation({
  //   mutationFn: async (student: User) => {
  //     await DeleteUser(student._id);
  //   },
  //   onSuccess: () => {
  //     refetch();
  //   },
  // });

//   const hidden = useUserStore.getState().hidden;
//   const { setHidden } = useUserStore();

  const handleViewDetailUser = (student: Student) => {
    // setAction("view");
    navigate(`/dashboard/User/action/${student._id}`);
  };

  const handleEditUser = (student: Student) => {
    // setAction("update");
    navigate(`/dashboard/User/action/${student._id}`);
  };

  // const handleDeleteUser = (student: User) => {
  //   Delete.mutate(student);
  // };

  const CreateNewStudent=()=>{
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
      render: ({ image }) => <img src={image} width="60px" height="60px" />,
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key:"testsAssigned",
      label: "Test Assigned",
      render: ({testsAssigned})=><div>{testsAssigned?.length}</div>,
    },
    {
      key:"testsDone",
      label: "Test Done",
      render: ({testsDone})=><div>{testsDone?.length}</div>,
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
      create={CreateNewStudent}
      // filter={true}
    />
  );
};

export default ViewStudentPage;
