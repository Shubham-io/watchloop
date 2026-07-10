import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader } from "@watchloop/components/ui/card";
import { Button } from "@watchloop/components/ui/button";
import { Input } from "@watchloop/components/ui/input";
import { Label } from "@watchloop/components/ui/label";

import { PasswordInput } from "../components/PasswordInput";
import { useLogin } from "../hooks/useLogin";
import { useAppDispatch } from "../../../store/hooks";
import { login } from "../authSlice";

interface LoginFormData {
  login: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutateAsync, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const payload = data.login.includes("@")
        ? {
            email: data.login,
            password: data.password,
            username: "",
          }
        : {
            username: data.login,
            password: data.password,
            email: "",
          };

      const response = await mutateAsync(payload);

      dispatch(login(response));

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg bg-transparent border shadow-gray-50/20">
      <CardHeader className="space-y-2 text-center">
        <h2 className="text-3xl font-bold">Welcome Back</h2>

        <p className="text-muted-foreground">
          Login to continue watching videos.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label>Username or Email</Label>

            <Input
              placeholder="Enter username or email"
              {...register("login", {
                required: "Username or Email is required",
              })}
            />

            {errors.login && (
              <p className="text-sm text-destructive">{errors.login.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Password</Label>

            <PasswordInput
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Signing in..." : "Login"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
