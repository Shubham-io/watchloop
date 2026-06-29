import { useForm } from "react-hook-form";
import { useLogin } from "../features/auth/hooks/useLogin";
import { useAppDispatch } from "../store/hooks";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormData>();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await mutateAsync(data);

      dispatch(login(user));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="max-w-md mx-auto mt-20 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register("email")}
        placeholder="Email"
        className="border p-2 w-full"
      />

      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        className="border p-2 w-full"
      />

      <button
        disabled={isPending}
        className="bg-blue-500 px-4 py-2 text-white rounded"
      >
        {isPending ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
