import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { object, string, number, date, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputCustom from "@/components/custom/Input";
import { useNavigate } from "react-router";
import UploadCustom from "@/components/custom/Upload";
import { StudentValue } from "@/types/Data/Student";
import { addNewStudent } from "@/services/studentService";

let studentSchema = object({
    name: string().required("Name cannot be empty"),
    email: string().required("Email cannot be empty "),
    image: string(),
    password: string().required("Password cannot be empty")
});

const AddNewStudent = () => {
    const { register, handleSubmit, control, watch, reset } = useForm<StudentValue>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            image: "",
        },
        resolver: yupResolver(studentSchema),
    });

    const navigate = useNavigate();


    const AddNewStudent = useMutation({
        mutationFn: async (studentInfo: StudentValue) => {
            const r = await addNewStudent(studentInfo);
            console.log("check res create: ",r)
        },
        onSuccess: async () => {
            reset()
            navigate('/dashboard/student/viewall')
        },
    });

    const onSubmit = (data: StudentValue) => {
        AddNewStudent.mutate(data);
    };

    return (
        <div className="overflow-hidden">
            <div className="">
                <h1 className="font-medium text-4xl text-[#0369a1]">Add New Student</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <InputCustom control={control} name="name" label="Name of student" />
                <InputCustom control={control} name="email" label="Email" />
                <InputCustom control={control} name="password" label="Password" />
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

export default AddNewStudent;
