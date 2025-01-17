import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, PasswordEye, PhoneInput } from "../../components";
import * as styles from "./SignUp.module.scss";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import { Auth } from "../../types/auth";

interface SignUpForm {
  phoneNumber: string;
  countryCode: string;
  password: string;
}

const schema = yup
  .object({
    phoneNumber: yup.string().required("Phone number is required"),
    countryCode: yup.string().required("Country code is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  })
  .required();

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      countryCode: "+60",
    },
  });

  const [countryCode, setCountryCode] = useState("+60");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    setValue("phoneNumber", value);
  };

  const onSubmit = async (data: SignUpForm) => {
    try {
      console.log(data);
      // Handle sign up logic
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <>
      <DocumentTitle title="Sign Up" />
      <div className="center-flex-column full-height">
        <div className={styles.signupContainer}>
          <div className={styles.headerSection}>
            <h1 id="signup-title">Create Account</h1>
          </div>
          <div className={styles.contentSection}>
            <form
              className={styles.signupForm}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-labelledby="signup-title"
            >
              <div className={styles.formGroup}>
                <PhoneInput
                  countryCode={countryCode}
                  phoneNumber={phoneNumber}
                  onCountryCodeChange={setCountryCode}
                  onPhoneNumberChange={handlePhoneNumberChange}
                  error={errors.phoneNumber?.message}
                  id="signup-phone"
                />
              </div>
              <div className={styles.formGroup}>
                <PasswordEye
                  {...register("password")}
                  label="Password"
                  error={errors.password?.message}
                  id="signup-password"
                  autoComplete="new-password"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
