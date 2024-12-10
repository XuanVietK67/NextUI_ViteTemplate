import { Button } from "@nextui-org/button";
import {  useForm } from "react-hook-form";
import { Spinner } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputCustom from "@/components/custom/Input";
import UploadCustom from "@/components/custom/Upload";
import { getDetailTeacher, UpdateTeacher } from "@/services/teacherService";
import { TeacherValue } from "@/types/Data/Teacher";



const TeacherAction = () => {
  const { id, action } = useParams();

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["userDetail", id],
    queryFn: async () => {
      const res = await getDetailTeacher(id);
      console.log("check datail teacher: ",res.data.data)
      return res.data.data;
    },
  });

  const navigate = useNavigate();

  let teacherSchema = object({
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
    resolver: yupResolver(teacherSchema),
    mode: "all",
  });
  const Update = useMutation({
    mutationFn: async (dataUpdate: TeacherValue) => {
      const res = await UpdateTeacher(id? id: "", dataUpdate);
      console.log("check res: ",res)
    },
    onSuccess: () => {
      navigate("/dashboard/teacher/viewall");
    },
  });

  const onSubmit = (dataa: any) => {
    Update.mutate(dataa);
  };

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
          {action == "view" ? "Teacher Details" : "Update Teacher"}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-12 mt-4"
      >
        <InputCustom<TeacherValue>
          control={control}
          name="name"
          placeholder="your username"
          label="Name"
          action={action}

        />
        <InputCustom<TeacherValue> control={control} name="email"    action={action}/>
        <UploadCustom control={control} name="image" />

        <div className="flex justify-end gap-3">
          <Button
            color="secondary"
            onClick={() => navigate("/dashboard/teacher/viewall")}
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

export default TeacherAction;
