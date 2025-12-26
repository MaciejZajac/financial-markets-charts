"use client";
import { CountrySelectField } from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import { InputField } from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
  control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "US",
      investmentGoals: "Growth",
      riskTolerance: "Medium",
      preferredIndustry: "Technology",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const result = await signUpWithEmail(data);
      if(result.success) {
        router.push("/");
      }
    } catch (error) {
      console.error("error", error);
      toast.error("Sign up failed", { description: error instanceof Error ? error.message : 'Failed to create an account' })
    }
  };

  return (
    <>
      <h1 className="form-title">Sign Up & Personalize</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          register={register}
          error={errors.fullName}
          validation={{ required: "Full name is required", minLength: 2 }}
        />
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
        {/* Country */}
        <CountrySelectField
          control={control}
          name="country"
          error={errors.country}
          label="Country"
        />

        <SelectField
          name="investmentGoals"
          label="Investmant Goals"
          placeholder="Select your investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />
        <SelectField
          name="riskTolerance"
          label="Right Tolerance"
          placeholder="Select your risk level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />
        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your preferred industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Creating account" : "Start your Investing Journey"}
        </Button>
        <FooterLink
          text="Already have an account?"
          linkText="Sign in"
          href="/sign-in"
        />
      </form>
    </>
  );
};

export default SignUp;
