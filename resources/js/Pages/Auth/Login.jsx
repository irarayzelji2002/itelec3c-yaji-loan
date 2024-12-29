import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PassInput from "@/Components/PassInput";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { clearFieldError } from "@/utils/formFunctions";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Login({ status, canResetPassword }) {
  const {
    data,
    setData,
    post,
    processing,
    errors: serverErrors,
    setError: setServerError,
    reset,
  } = useForm({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});

  const submit = async (e) => {
    e.preventDefault();

    try {
      await post(route("login"), {
        onSuccess: () => {
          reset("password");
          console.log("Login success");
        },
        onError: (errors) => {
          reset("password");
          console.log("Login onError:", errors);
          if (errors.message) {
            setError("email", errors.message);
          }
        },
        onFinish: () => {
          reset("password");
          console.log("Login onFinish");
        },
      });
    } catch (error) {
      console.error("Login catched error:", error);
    }
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full border-green-900"
            autoComplete="username"
            isFocused={true}
            onChange={(e) => {
              setData("email", e.target.value);
              clearFieldError("email", setErrors);
              setServerError("email", "");
            }}
          />
          <InputError message={serverErrors.email || errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />
          <PassInput
            id="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full border-green-900"
            autoComplete="current-password"
            onChange={(e) => {
              setData("password", e.target.value);
              clearFieldError("password", setErrors);
              setServerError("password", "");
            }}
          />
          <InputError message={serverErrors.password || errors.password} className="mt-2" />
        </div>

        <div className="mt-4 block" style={{ display: "flex", justifyContent: "space-between" }}>
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => {
                setData("remember", e.target.checked);
                clearFieldError("remember", setErrors);
                setServerError("remember", "");
              }}
            />
            <span className="ms-2 text-sm text-gray-600">Remember me</span>
          </label>{" "}
          {canResetPassword && (
            <Link
              href={route("password.request")}
              className="!rounded-lg text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
            >
              Forgot your password?
            </Link>
          )}
        </div>

        <InputError message={serverErrors.general || errors.general} className="mt-2" />

        <div className="center-column">
          <PrimaryButton
            style={{
              backgroundColor: "var(--color-light-green)",
              color: "black",
              padding: "10px 20px",
              borderRadius: "5px",
              width: "100%",
              marginLeft: "0px",
              marginTop: "20px",
            }}
            className="ms-4"
            disabled={processing}
          >
            Login
          </PrimaryButton>

          <span className="ms-2 text-sm text-gray-600" style={{ marginTop: "20px" }}>
            Don't have an account?{" "}
            <Link href={route("register")} className="underline">
              Sign Up Here
            </Link>
          </span>
        </div>
      </form>
    </GuestLayout>
  );
}
