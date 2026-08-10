import AuthButton from "../AuthButton";
import InputField from "../InputField";
import PasswordField from "../PasswordField";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/services/authService";
import { Link, useNavigate } from "react-router-dom";

import {
  registerSchema,
  type RegisterFormValues,
} from "@/schemas/registerSchema";

export default function RegisterForm() {

    const {
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (
  data: RegisterFormValues
) => {
  try {
    const message = await authService.register({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword,
      termsAccepted: data.acceptTerms,
    });

    console.log(message);

    navigate("/login");

  } catch (error) {
    console.error(error);
  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      <div className="grid grid-cols-2 gap-4">

        <InputField
          label="First Name"
          placeholder="John"
          value={watch("firstName")}
          error={errors.firstName?.message}
          onChange={(value) =>
            setValue("firstName", value, {
              shouldValidate: true,
            })
          }
        />

        <InputField
          label="Last Name"
          placeholder="Doe"
          value={watch("lastName")}
          error={errors.lastName?.message}
          onChange={(value) =>
            setValue("lastName", value, {
              shouldValidate: true,
            })
          }
        />

      </div>

      <InputField
          label="Business Email"
          placeholder="john@company.com"
          value={watch("email")}
          error={errors.email?.message}
          onChange={(value) =>
            setValue("email", value, {
              shouldValidate: true,
            })
          }
        />

      <InputField
        label="Phone Number"
        placeholder="+91 9876543210"
        value={watch("phone")}
        error={errors.phone?.message}
        onChange={(value) =>
          setValue("phone", value, {
            shouldValidate: true,
          })
        }
      />

      <PasswordField
        label="Password"
        value={watch("password")}
        error={errors.password?.message}
        onChange={(value) =>
          setValue("password", value, {
            shouldValidate: true,
          })
        }
      />

      <PasswordField
        label="Confirm Password"
        value={watch("confirmPassword")}
        error={errors.confirmPassword?.message}
        onChange={(value) =>
          setValue("confirmPassword", value, {
            shouldValidate: true,
          })
        }
      />

      <label className="flex items-center gap-2 text-sm">

        <input
          type="checkbox"
          checked={watch("acceptTerms")}
          onChange={(e) =>
            setValue("acceptTerms", e.target.checked, {
              shouldValidate: true,
            })
          }
        />

        I agree to the Terms & Conditions

      </label>

      {errors.acceptTerms && (
        <p className="text-sm text-destructive">
          {errors.acceptTerms.message}
        </p>
      )}

      <AuthButton>
        Create Account
      </AuthButton>

      

    </form>
  );
}