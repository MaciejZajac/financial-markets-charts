"use client";
import FooterLink from "@/components/forms/FooterLink";
import { InputField } from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      console.log("data");
    } catch {
      console.log("error");
    }
  };

  return (
    <>
      <h1 className="form-title">Sign In & Personalize</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Email"
          placeholder="example@example.com"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Email adress is required",
          }}
        />
        <InputField
          name="password"
          label="Password"
          placeholder="Enter password"
          type="password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is required", minLength: 5 }}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Signing In" : "Sign in"}
        </Button>
        <FooterLink text="Don't have an account?" linkText="Sign up" href="/sign-up" />
      </form>
    </>
  );
};

export default SignIn;
