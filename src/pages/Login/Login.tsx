import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input, PasswordEye, RememberMe } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/images/logo.png";
import * as styles from "./Login.module.scss";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";

interface LoginFormData {
  username: string;
  password: string;
  rememberMe?: boolean;
}

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
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
      username: localStorage.getItem("username") || "",
      rememberMe: localStorage.getItem("rememberMe") === "true",
    },
  });

  const rememberMe = watch("rememberMe");

  useEffect(() => {
    if (rememberMe !== undefined) {
      localStorage.setItem("rememberMe", rememberMe.toString());
      if (!rememberMe) {
        localStorage.removeItem("username");
      }
    }
  }, [rememberMe]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.username, data.password);
      if (data.rememberMe) {
        localStorage.setItem("username", data.username);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <DocumentTitle title="Login" />
      <div className="center-flex-column full-height">
        <div className={styles.loginContainer}>
          <div className={styles.headerSection}>
            <img src={logo} alt="Company Logo" className={styles.logo} />
          </div>
          <div className={styles.contentSection}>
            <form
              className={styles.loginForm}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Login form"
            >
              <div className={styles.formGroup}>
                <Input
                  {...register("username")}
                  type="text"
                  label="Username"
                  error={errors.username?.message}
                  id="login-username"
                  autoComplete="username"
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
