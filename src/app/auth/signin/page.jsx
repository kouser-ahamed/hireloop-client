"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { GrGoogle } from "react-icons/gr";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrorMsg("");
    setIsLoading(true);

    const formElement = e.target;

    const email = formElement.email.value;
    const password = formElement.password.value;

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      setErrorMsg(error.message || "Login failed! Please check your email and password.");
      return;
    }

    setMessage("Login successful..!");

    setTimeout(() => {
      formElement.reset();
      router.push("/");
    }, 1000);
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-4 flex justify-center mb-10">
      <Card className="border w-full max-w-md sm:max-w-lg py-6 sm:py-8 md:py-10 px-4 sm:px-6 rounded-xl shadow-sm">
        <h1 className="text-center text-lg sm:text-2xl font-bold bg-linear-to-r from-[#5651f4] to-[#6d69f7] bg-clip-text text-transparent">
          Welcome back
        </h1>

        <p className="text-center text-slate-500 text-sm">
          Sign in to continue to HireLoop
        </p>

        <Form className="flex flex-col gap-4 mt-4" onSubmit={onSubmit}>
          {message && (
            <div className="w-full p-3 rounded-md bg-green-100 text-green-700 text-xs sm:text-sm text-center font-medium transition-all">
              {message}
            </div>
          )}

          {errorMsg && (
            <div className="w-full p-3 rounded-md bg-red-100 text-red-700 text-xs sm:text-sm text-center font-medium transition-all">
              {errorMsg}
            </div>
          )}

          <TextField isRequired name="email">
            <Label className="text-sm sm:text-base">Email</Label>
            <Input
              type="email"
              placeholder="john@example.com"
              className="h-10 sm:h-11 text-sm"
            />
            <FieldError />
          </TextField>

          <TextField isRequired name="password">
            <Label className="text-sm sm:text-base">Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="h-10 sm:h-11 text-sm"
            />
            <FieldError />
          </TextField>

          <div className="flex justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-xs sm:text-sm text-[#5651f4] font-semibold hover:text-[#6d69f7]"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 sm:h-11 text-sm bg-gradient-to-r from-[#5651f4] to-[#6d69f7] text-white font-semibold shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/25"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </Form>

        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="text-slate-400 text-xs sm:text-sm">Or</p>

          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 h-10 sm:h-11 text-sm border border-slate-200 bg-white/80 hover:border-indigo-200 hover:bg-indigo-50/70"
          >
            <GrGoogle />
            Sign in with Google
          </Button>

          <p className="text-center text-xs sm:text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-indigo-600 font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}