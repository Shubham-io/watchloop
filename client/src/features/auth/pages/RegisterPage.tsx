import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader } from "@watchloop/components/ui/card";
import { Button } from "@watchloop/components/ui/button";
import { Input } from "@watchloop/components/ui/input";
import { Label } from "@watchloop/components/ui/label";

import { useRegister } from "../hooks/useRegister";

interface RegisterFormData {
  fullname: string;
  username: string;
  email: string;
  password: string;
  avatar: FileList;
  coverImage: FileList;
}

export default function RegisterPage() {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const formData = new FormData();

      formData.append("fullname", data.fullname);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);

      formData.append("avatar", data.avatar[0]);

      if (data.coverImage?.length > 0) {
        formData.append("coverImage", data.coverImage[0]);
      }

      await mutateAsync(formData);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-lg shadow-lg bg-transparent border shadow-gray-50/20">
      <CardHeader className="space-y-2 text-center">
        <h2 className="text-3xl font-bold">Create Account</h2>

        <p className="text-muted-foreground">
          Join WatchLoop and start sharing videos.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>

              <Input
                id="fullname"
                placeholder="John Doe"
                {...register("fullname", {
                  required: "Full name is required",
                })}
              />

              {errors.fullname && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>

              <Input
                id="username"
                placeholder="john123"
                {...register("username", {
                  required: "Username is required",
                })}
              />

              {errors.username && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              {errors.password && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar</Label>

              <Input
                id="avatar"
                type="file"
                accept="image/*"
                {...register("avatar", {
                  required: "Avatar is required",
                })}
              />

              {errors.avatar && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.avatar.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image (Optional)</Label>

              <Input
                id="coverImage"
                type="file"
                accept="image/*"
                {...register("coverImage")}
              />
            </div>
         

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creating Account..." : "Register"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
