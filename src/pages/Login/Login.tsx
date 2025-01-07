import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input, PasswordEye, RememberMe, PhoneInput, AlternativeSignUp } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/images/logo.png";
import * as styles from "./Login.module.scss";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";

interface LoginFormData {
  phoneNumber: string;
  countryCode: string;
  password: string;
  rememberMe?: boolean;
}

const schema = yup
  .object({
    phoneNumber: yup.string().required("Phone number is required"),
    countryCode: yup.string().required("Country code is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    rememberMe: yup.boolean(),
  })
  .required();

const Login: React.FC = () => {
  const { login, isLoading, error: authError } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: localStorage.getItem("phoneNumber") || "",
      countryCode: "+60",
      rememberMe: localStorage.getItem("rememberMe") === "true",
    },
  });

  const [countryCode, setCountryCode] = useState("+60");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    setValue("phoneNumber", value);
  };

  const rememberMe = watch("rememberMe");

  useEffect(() => {
    if (rememberMe !== undefined) {
      localStorage.setItem("rememberMe", rememberMe.toString());
      if (!rememberMe) {
        localStorage.removeItem("phoneNumber");
      }
    }
  }, [rememberMe]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.phoneNumber, data.password);
      if (data.rememberMe) {
        localStorage.setItem("phoneNumber", data.phoneNumber);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <DocumentTitle title="Login" />
      <div className={styles.loginContainer}>
        <div className={styles.headerSection}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.contentSection}>
          <form
            className={styles.loginForm}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-label="Login form"
          >
            <div className={styles.formFields}>
              <div className={styles.formGroup}>
                <PhoneInput
                  countryCode={countryCode}
                  phoneNumber={phoneNumber}
                  onCountryCodeChange={setCountryCode}
                  onPhoneNumberChange={handlePhoneNumberChange}
                  error={errors.phoneNumber?.message}
                  id="login-phone"
                />
              </div>
              <div className={styles.formGroup}>
                <PasswordEye
                  {...register("password")}
                  label="Password"
                  error={errors.password?.message}
                  id="login-password"
                  autoComplete="current-password"
                />
              </div>
              <RememberMe {...register("rememberMe")} id="login-remember" />
              {authError && (
                <div className={styles.error} role="alert" aria-live="polite">
                  {authError}
                </div>
              )}
              <Button type="submit" disabled={isLoading} isLoading={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
            <AlternativeSignUp />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
