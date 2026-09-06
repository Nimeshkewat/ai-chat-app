import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useLogin } from "../hooks/auth/useLogin";
import { useQueryClient } from "@tanstack/react-query";
import type { LoginInput } from "@/types/auth";
import { z } from "zod";
import { loginSchema } from "../../../server/src/validators/userValidator";

function Login() {
  const [input, setInput] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [inputErrors, setInputErrors] = useState<Partial<LoginInput>>({});
  const [apiError, setApiError] = useState("");

  const { mutate: login, isPending } = useLogin();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = loginSchema.safeParse(input);
    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setInputErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }
    setInputErrors({});
    setApiError("");

    login(input, {
      onSuccess: async () => {
        await queryClient.invalidateQueries();
        navigate("/chat");
      },
      onError: (error) => {
        setApiError(error.response?.data.message || "Login Failed");
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>

        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      {apiError && (
        <div className="relative py-2 text-center text-sm font-medium mb-3 text-red-500 bg-red-100 rounded-md">
          {apiError}
          <p
            onClick={() => setApiError("")}
            className="absolute top-0 right-3 cursor-pointer "
          >
            x
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {inputErrors.email && (
            <p className="text-sm text-destructive">{inputErrors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>

            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Forgot password?
            </Link>
          </div>

          <Input
            id="password"
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
          {inputErrors.password && (
            <p className="text-sm text-destructive">{inputErrors.password}</p>
          )}
        </div>

        <Button disabled={isPending} type="submit" className="w-full">
          Login
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-foreground hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default Login;
