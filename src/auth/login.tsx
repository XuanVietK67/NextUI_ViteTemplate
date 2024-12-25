import { useForm } from "react-hook-form";
import LoginLayout from "@/layouts/login.layout";
import { Button, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/AuthStore";
import { useNavigate } from "react-router-dom";
import InputCustom from "@/components/custom/Input";
import { object, string, ValidationError } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataLogin } from "@/types/Data/User";
import { PostLogin } from "@/services/userService";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [errors, setErrors] = useState<String>();
  let LoginSchema = object({
    username: string().required("email cannot empty"),
    password: string().required("email cannot empty"),
  });

  const { control, handleSubmit, reset, setError } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(LoginSchema),
  });
  const { setAccess_Token, setUser } = useAuthStore();
  const navigate = useNavigate();
  const Login = useMutation({
    mutationFn: async (data: DataLogin) => {
      const r = await PostLogin(data);
      const res = r.data.data;
      console.log("check res: ",res)
      setUser(res.user);
      setAccess_Token(res.access_token);
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      setError("username", {
        message: "email/password is invalid",
      });
      setError("password", {
        message: "email/password is invalid",
      });
    },
  });
  const onSubmit = (data: any) => {
    Login.mutate(data);
    reset();
  };

  return (
    <LoginLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        {/* <label>Email</label> */}
        <InputCustom control={control} name="username" label="email" />
        {
          // error.email ? <p>{error.email.message}</p> :''
        }
        <InputCustom
          control={control}
          name="password"
          label="password"
          type={isVisible ? "text" : "password"}
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
        />
        {/* <Input
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
        /> */}
        {/* <Input type="file" placeholder="image" {...register("image", {})} /> */}
        <div className="flex justify-between">
          <Link className="cursor-pointer" href="/">
            Return homepage
          </Link>
          <Button type="submit" color="primary">
            Login
          </Button>
        </div>
      </form>
      <br />
      <hr />
      <div className="flex flex-row justify-between p-16">
        <p>You don't have an account</p>
        <Link href="/register">Register here</Link>
      </div>
    </LoginLayout>
  );
};

export default LoginPage;
