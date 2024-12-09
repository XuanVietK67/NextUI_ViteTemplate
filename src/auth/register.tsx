import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Link, Select, SelectItem } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import RegisterLayout from "@/layouts/register.layout";
import { DataRegister } from "@/types/Data/User";
import { PostRegister } from "@/services/userService";
import UploadCustom from "@/components/custom/Upload";

const Human = [
  { key: "Normal user", label: "Normal User" },
  { key: "Seller", label: "Seller" },
];

const RegisterPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm();

  const Register = useMutation({
    mutationFn: async (data: DataRegister) => {
      const res = await PostRegister(data);
    },
    onError: ()=>{
    }
  });

  const onSubmit = (data: any) => {
    console.log("check data: ",data)
    const dataRegister = { ...data };
    Register.mutate(dataRegister);
    reset();
  };

  return (
    <RegisterLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <label>Email</label>
        <Input
          type="text"
          placeholder="Enter your email"
          {...register("email", { required: true })}
        />

        <label>User Name</label>
        <Input
          type="text"
          placeholder="Enter your name"
          {...register("username", { required: true })}
        />

        <label>Password</label>
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <div>hide</div>
              ) : (
                // <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                // <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                <div>show</div>
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xs"
          {...register("password", { required: true })}
        />
        {/* <Select
          items={Human}
          label="Who are u"
          placeholder="Select your role"
          className="max-w-xs"
          {...register("role", { required: true })}
        >
          {(human) => <SelectItem key={human.key}>{human.label}</SelectItem>}
        </Select> */}

        <UploadCustom control={control} name="image" />

        {/* <Input type="file" placeholder="image" {...register("image", {})} /> */}
        <div className="flex justify-between">
          <Link className="cursor-pointer" href="/home">
            Return homepage
          </Link>
          <Button type="submit" color="primary">
            Register
          </Button>
        </div>
      </form>
      <br />
      <hr />
      <div className="flex flex-row justify-between p-16">
        <p>You have an account</p>
        <Link href="/login">Login here</Link>
      </div>
    </RegisterLayout>
  );
};

export default RegisterPage;
