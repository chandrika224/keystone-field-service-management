// LoginForm.tsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
 // Import useAuth

import {
  loginSchema,
  type LoginFormData,
} from "@/schemas/loginSchema";

import InputField from "../InputField";
import PasswordField from "../PasswordField";
import RememberMe from "../RememberMe";
import AuthButton from "../AuthButton";
import AuthHeader from "../AuthHeader";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth(); // Destructure login from AuthContext
  const navigate = useNavigate();

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Call AuthContext login (handles token save + profile fetch + state update)
      const user = await login(data);

      const role = user.role;

      if (!role) {
        console.error("Role not found on user object");
        return;
      }

      // Redirect based on user role
      switch (role.toUpperCase()) {
        case "ADMIN":
        case "MANAGER":
          navigate("/manager/dashboard");
          break;
        case "DISPATCHER":
          navigate("/dispatcher/dashboard");
          break;
        case "TECHNICIAN":
          navigate("/technician/dashboard");
          break;
        case "CUSTOMER":
          navigate("/customer/dashboard");
          break;
        default:
          console.error("Unknown user role:", role);
          navigate("/login");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <AuthHeader title="Welcome Back" subtitle="Sign in to your account" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          label="Email"
          type="email"
          placeholder="john@example.com"
          value={watch("email")}
          error={errors.email?.message}
          onChange={(value) =>
            setValue("email", value, { shouldValidate: true })
          }
        />

        <PasswordField
          label="Password"
          placeholder="Enter your password"
          value={watch("password")}
          error={errors.password?.message}
          onChange={(value) =>
            setValue("password", value, { shouldValidate: true })
          }
        />

        <div className="flex items-center justify-between">
          <RememberMe checked={rememberMe} onCheckedChange={setRememberMe} />
          <Link to="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot Password?
          </Link>
        </div>

        <AuthButton loading={isSubmitting}>Sign In</AuthButton>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Register
          </Link>
        </p>
      </form>
    </>
  );
}