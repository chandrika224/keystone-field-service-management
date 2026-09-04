import AuthButton from "../AuthButton";
import InputField from "../InputField";
import PasswordField from "../PasswordField";

import { useForm } from "react-hook-form";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";

import type { RegisterRequest } from "@/types/auth";

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9\s-]{7,15}$/;

export default function RegisterForm() {
  const {
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const navigate = useNavigate();

  // Manual validation, since we dropped the zod resolver.
  // Returns true if valid, false (and sets field errors) if not.
  const validate = (data: RegisterFormValues) => {
    clearErrors();
    let valid = true;

    const fail = (field: keyof RegisterFormValues, message: string) => {
      setError(field, { type: "manual", message });
      valid = false;
    };

    if (!data.firstName.trim()) fail("firstName", "First name is required");
    if (!data.lastName.trim()) fail("lastName", "Last name is required");

    if (!data.email.trim()) {
      fail("email", "Email is required");
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
      fail("email", "Invalid email address");
    }

    if (!data.phone.trim()) {
      fail("phone", "Phone number is required");
    } else if (!PHONE_REGEX.test(data.phone.trim())) {
      fail("phone", "Invalid phone number");
    }

    if (!data.address.trim()) fail("address", "Address is required");

    if (!data.password) {
      fail("password", "Password is required");
    } else if (data.password.length < 8) {
      fail("password", "Password must be at least 8 characters");
    }

    if (data.confirmPassword !== data.password) {
      fail("confirmPassword", "Passwords do not match");
    }

    if (!data.acceptTerms) {
      fail("acceptTerms", "You must accept the terms");
    }

    return valid;
  };

  const onSubmit = async (data: RegisterFormValues) => {
    if (!validate(data)) return;

    try {
      const payload: RegisterRequest = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        address: data.address.trim(),
        password: data.password,
        confirmPassword: data.confirmPassword,
        termsAccepted: data.acceptTerms,
      };

      await authService.register(payload);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="First Name"
          placeholder="John"
          value={watch("firstName")}
          error={errors.firstName?.message}
          onChange={(value) =>
            setValue("firstName", value, { shouldValidate: false })
          }
        />

        <InputField
          label="Last Name"
          placeholder="Doe"
          value={watch("lastName")}
          error={errors.lastName?.message}
          onChange={(value) =>
            setValue("lastName", value, { shouldValidate: false })
          }
        />
      </div>

      <InputField
        label="Business Email"
        placeholder="john@company.com"
        value={watch("email")}
        error={errors.email?.message}
        onChange={(value) =>
          setValue("email", value, { shouldValidate: false })
        }
      />

      <InputField
        label="Phone Number"
        placeholder="+91 9876543210"
        value={watch("phone")}
        error={errors.phone?.message}
        onChange={(value) =>
          setValue("phone", value, { shouldValidate: false })
        }
      />

      <InputField
        label="Address"
        placeholder="12 MG Road, Bengaluru, Karnataka"
        value={watch("address")}
        error={errors.address?.message}
        onChange={(value) =>
          setValue("address", value, { shouldValidate: false })
        }
      />

      <PasswordField
        label="Password"
        value={watch("password")}
        error={errors.password?.message}
        onChange={(value) =>
          setValue("password", value, { shouldValidate: false })
        }
      />

      <PasswordField
        label="Confirm Password"
        value={watch("confirmPassword")}
        error={errors.confirmPassword?.message}
        onChange={(value) =>
          setValue("confirmPassword", value, { shouldValidate: false })
        }
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={watch("acceptTerms")}
          onChange={(e) => setValue("acceptTerms", e.target.checked)}
        />
        I agree to the Terms & Conditions
      </label>

      {errors.acceptTerms && (
        <p className="text-sm text-destructive">
          {errors.acceptTerms.message}
        </p>
      )}

      <AuthButton disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </AuthButton>
    </form>
  );
}