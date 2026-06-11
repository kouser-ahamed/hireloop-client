"use client";

import { Check } from "@gravity-ui/icons";
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
import { GrGoogle } from "react-icons/gr";
import Link from "next/link";
import { useState } from "react";
import PasswordChecklist from "@/components/PasswordChecklist";

export default function SignUpPage() {
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrorMsg("");
    setIsLoading(true);

    const formElement = e.target;

    const name = formElement.name.value.trim();
    const image = formElement.image.value.trim();
    const email = formElement.email.value.trim();
    const passwordValue = formElement.password.value;

    const isPasswordValid =
      passwordValue.length >= 6 &&
      /[A-Z]/.test(passwordValue) &&
      /[a-z]/.test(passwordValue);

    if (!isPasswordValid) {
      setErrorMsg(
        "Password must be at least 6 characters and include uppercase and lowercase letters."
      );
      setIsLoading(false);
      return;
    }

    const { error } = await authClient.signUp.email({
      name,
      image,
      email,
      password: passwordValue,
      autoSignIn: true,
    });

    if (error) {
      setErrorMsg(error.message || "Registration failed!");
      setIsLoading(false);
      return;
    }

    await authClient.signOut();

    setMessage("Registration successful..!");

    setTimeout(() => {
      formElement.reset();
      setPassword("");
      setIsLoading(false);

      // Safe one-time redirect + reload
      window.location.replace("/auth/signin");
    }, 1500);
  };

  const handleGoogleSignUp = async () => {
    await authClient.signUp.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-4 flex justify-center mb-10 bg-[#030303]">
      <Card className="border border-neutral-800/70 bg-[#161616] w-full max-w-md sm:max-w-lg py-6 sm:py-8 md:py-10 px-4 sm:px-6 rounded-xl shadow-xl shadow-black/30">
        <h1 className="text-center text-lg sm:text-2xl font-bold bg-gradient-to-r from-[#5651f4] to-[#6d69f7] bg-clip-text text-transparent">
          Create an account
        </h1>

        <p className="text-center text-neutral-400 text-sm">
          Fill in the Fields below to get started
        </p>

        <Form
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
          onReset={() => {
            setPassword("");
            setMessage("");
            setErrorMsg("");
            setIsLoading(false);
          }}
        >
          {message && (
            <div className="w-full p-3 rounded-md bg-[#151f17] border border-green-800/50 text-green-400 text-xs sm:text-sm text-center font-medium transition-all">
              {message}
            </div>
          )}

          {errorMsg && (
            <div className="w-full p-3 rounded-md bg-[#241313] border border-red-800/50 text-red-400 text-xs sm:text-sm text-center font-medium transition-all">
              {errorMsg}
            </div>
          )}

          <TextField isRequired name="name">
            <Label className="text-sm sm:text-base text-neutral-300">
              Name
            </Label>
            <Input
              placeholder="Enter your name"
              className="h-10 sm:h-11 text-sm bg-[#0f0f10] text-white border border-neutral-800 placeholder:text-neutral-500"
            />
            <FieldError />
          </TextField>

          <TextField name="image">
            <Label className="text-sm sm:text-base text-neutral-300">
              Image URL
            </Label>
            <Input
              placeholder="Image URL"
              className="h-10 sm:h-11 text-sm bg-[#0f0f10] text-white border border-neutral-800 placeholder:text-neutral-500"
            />
            <FieldError />
          </TextField>

          <TextField isRequired name="email">
            <Label className="text-sm sm:text-base text-neutral-300">
              Email
            </Label>
            <Input
              type="email"
              placeholder="john@example.com"
              className="h-10 sm:h-11 text-sm bg-[#0f0f10] text-white border border-neutral-800 placeholder:text-neutral-500"
            />
            <FieldError />
          </TextField>

          <TextField isRequired name="password">
            <Label className="text-sm sm:text-base text-neutral-300">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              className="h-10 sm:h-11 text-sm bg-[#0f0f10] text-white border border-neutral-800 placeholder:text-neutral-500"
            />
            <PasswordChecklist password={password} />
            <FieldError />
          </TextField>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 sm:h-11 text-sm bg-gradient-to-r from-[#5651f4] to-[#6d69f7] text-white font-semibold shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/25 hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Check />
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>

            <Button
              type="reset"
              variant="secondary"
              disabled={isLoading}
              className="w-full h-10 sm:h-11 text-sm bg-neutral-900 text-neutral-300 border border-neutral-800 hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Reset
            </Button>
          </div>
        </Form>

        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="text-neutral-500 text-xs sm:text-sm">Or</p>

          <Button
            onClick={handleGoogleSignUp}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 h-10 sm:h-11 text-sm border border-neutral-800 bg-[#0f0f10] text-neutral-300 hover:border-[#5651f4]/60 hover:bg-[#181827]"
          >
            <GrGoogle />
            Sign up with Google
          </Button>

          <p className="text-center text-xs sm:text-sm text-neutral-400">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-[#5651f4] font-bold hover:text-[#6d69f7]"
            >
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}