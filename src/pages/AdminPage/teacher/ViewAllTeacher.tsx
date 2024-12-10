import { useQuery } from "@tanstack/react-query";

import React, { useCallback, useState } from "react";
import { DeleteIcon, EditIcon, EyeIcon } from "@/components/layout/icons";
import { TableColumn } from "@/types";
import { useNavigate } from "react-router";
import { User } from "@/types/Data/User";
import { getListStudent } from "@/services/studentService";
import ITable from "@/components/table/Table";
import { Student } from "@/types/Data/Student";
import { getListTeacher } from "@/services/teacherService";
import { Teacher } from "@/types/Data/Teacher";
// import ITable from "@/components/Table";
// import Table from '@/components/Table'

const ViewTeacherPage = () => {
  const [page, setPage] = useState<number>(1);
  console.log(page);
  const rowsPerPage = 5;
//   const { setAction } = useUserStore();

  const navigate = useNavigate();

  const { data, isFetching, isPending, isLoading, refetch } = useQuery({
    queryKey: ["fetchingUser", page, rowsPerPage],
    queryFn: async () => {
      let res = await getListTeacher(page, rowsPerPage);
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

  const handleViewDetailUser = (teacher: Teacher) => {
    // setAction("view");
    navigate(`/dashboard/teacher/action/${teacher._id}/view`);
  };

  const handleEditUser = (teacher: Teacher) => {
    // setAction("update");
    navigate(`/dashboard/teacher/action/${teacher._id}/update`);
  };

  // const handleDeleteUser = (student: User) => {
  //   Delete.mutate(student);
  // };

  const CreateNewTeacher=()=>{
    navigate('/dashboard/addnewteacher')
  }

  let columns: TableColumn<Teacher>[] = [
    {
      key: "name",
      label: "Teacher Name",
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
      key:"testList",
      label: "Number of Test",
      render: ({testList})=><div>{testList?.length ? testList.length: 0}</div>,
    },
    {
      key: "action",
      label: "ACTION",
      render: [
        {
          icon: <EyeIcon />,
          onClick: (teacher) => handleViewDetailUser(teacher),
          label: "Details",
        },
        {
          icon: <EditIcon />,
          onClick: (teacher) => handleEditUser(teacher),
          label: "Edit Teacher",
        },
        {
          icon: <DeleteIcon />,
          label: "Delete Teacher",
          // onClick: (User) => handleDeleteUser(User),
          onClick: (teacher) => handleEditUser(teacher),
          color: "danger" as const,
        },
      ],
    },
  ];


  return (
    <ITable<Teacher>
      data={data}
      columnsFilter={columns}
      page={page}
      setPage={setPage}
      showColumnsAction={true}
      columns={columns}
      create={CreateNewTeacher}
    />
  );
};

export default ViewTeacherPage;
