import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import type { RegisterInput } from "@/types/auth";
import { useRegiseter } from "@/hooks/auth/useRegister";
import { registerSchema } from "../schema/userSchema";
import z from "zod";
import Loader from "@/components/ui/Loader";

function Register() {
  const [input, setInput] = useState<RegisterInput>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [inputErrors, setInputErrors] = useState<Partial<RegisterInput>>({});
  const [apiError, setApiError] = useState("");

  const { mutate: register, isPending } = useRegiseter();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.password !== input.confirmPassword) {
      return setApiError("Password and confirm password do not match");
    }
    setApiError("");

    const result = registerSchema.safeParse(input);
    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setInputErrors({
        username: fieldErrors.username?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: <fieldErrors className="confi"></fieldErrors>?.[0],
      });
      return;
    }
    setInputErrors({});
    setApiError("");

    register(input, {
      onSuccess: async (data) => {
        console.log(data);
        navigate("/login");
      },
      onError: (error) => {
        console.log(error.response?.data.message || "Login Failed");
      },
    });
  };
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>

        <p className="text-sm text-muted-foreground">
          Get started with your AI assistant
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
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            name="username"
            value={input.username}
            onChange={handleChange}
            placeholder="Your username"
          />
          {inputErrors.username && (
            <p className="text-sm text-destructive">{inputErrors.username}</p>
          )}
        </div>

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
          <Label htmlFor="password">Password</Label>
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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
          />
          {inputErrors.confirmPassword && (
            <p className="text-sm text-destructive">
              {inputErrors.confirmPassword}
            </p>
          )}
        </div>

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? <Loader /> : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-foreground hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
