import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { object, string, number, date, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputCustom from "@/components/custom/Input";
import { useNavigate } from "react-router";
import UploadCustom from "@/components/custom/Upload";
import { StudentValue } from "@/types/Data/Student";
import { addNewTeacher } from "@/services/teacherService";

let teacherSchema = object({
    name: string().required("Name cannot be empty"),
    email: string().required("Email cannot be empty "),
    image: string(),
    password: string().required("Password cannot be empty")
});

const AddNewTeacher = () => {
    const { register, handleSubmit, control, watch, reset } = useForm<StudentValue>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            image: "",
        },
        resolver: yupResolver(teacherSchema),
    });

    const navigate = useNavigate();


    const AddNewTeacher = useMutation({
        mutationFn: async (studentInfo: StudentValue) => {
            const r = await addNewTeacher(studentInfo);
            console.log("check res create: ", r)
        },
        onSuccess: async () => {
            reset()
            navigate('/dashboard/teacher/viewall')
        },
    });

    const onSubmit = (data: StudentValue) => {
        AddNewTeacher.mutate(data);
    };

    return (
        <div className="overflow-hidden">
            <div className="">
                <h1 className="font-medium text-4xl text-[#0369a1]">Add New Teacher</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <InputCustom control={control} name="email" label="Email" />
                <InputCustom control={control} name="password" label="Password" />
                <InputCustom control={control} name="name" label="Name of teacher" />
                <UploadCustom control={control} name="image" />
                <div className="flex justify-end">
                    <Button type="submit" color="primary">
                        Create
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddNewTeacher;
