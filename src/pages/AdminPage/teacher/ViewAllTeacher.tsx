import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { DeleteIcon, EditIcon, EyeIcon } from "@/components/layout/icons";
import { TableColumn } from "@/types";
import { useNavigate } from "react-router";
import ITable from "@/components/table/Table";
import { getListTeacher } from "@/services/teacherService";
import { Teacher } from "@/types/Data/Teacher";
import { Avatar } from "@nextui-org/react";
import Loading from "@/components/layout/Loading";
// import ITable from "@/components/Table";
// import Table from '@/components/Table'

const ViewTeacherPage = () => {
  const [page, setPage] = useState<number>(1);
  console.log(page);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  //   const { setAction } = useUserStore();

  const navigate = useNavigate();

  const { data, isFetching } = useQuery({
    queryKey: ["fetchingUser", page, rowsPerPage],
    queryFn: async () => {
      let res = await getListTeacher(page, rowsPerPage);
      return res.data.data;
    },
  });


  const handleViewDetailUser = (teacher: Teacher) => {
    navigate(`/dashboard/teacher/action/${teacher._id}/view`);
  };

  const handleEditUser = (teacher: Teacher) => {
    navigate(`/dashboard/teacher/action/${teacher._id}/update`);
  };


  const CreateNewTeacher = () => {
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
      key: "testList",
      label: "Number of Test",
      render: ({ testList }) => <div>{testList?.length ? testList.length : 0}</div>,
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
          onClick: (teacher) => handleEditUser(teacher),
          color: "danger" as const,
        },
      ],
    },
  ];


  if (isFetching) {
    return (
      <Loading />
    )
  }
  else {
    return (
      <ITable<Teacher>
        data={data}
        header
        footer
        columnsFilter={columns}
        page={page}
        setPage={setPage}
        showColumnsAction={true}
        columns={columns}
        create={CreateNewTeacher}
        setRowsPerPage={setRowsPerPage}
      />
    );
  }


};

export default ViewTeacherPage;
