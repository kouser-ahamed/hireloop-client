"use client";

import { Check } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
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
import PasswordChecklist from "@/components/PasswordChecklist";

export default function SignUpPage() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrorMsg("");

    // ফর্ম এলিমেন্ট রেফারেন্স ধরে রাখা
    const formElement = e.target;

    const name = formElement.name.value;
    const image = formElement.image.value;
    const email = formElement.email.value;
    const passwordValue = formElement.password.value;

    const { error } = await authClient.signUp.email({
      name,
      image,
      email,
      password: passwordValue,
      autoSignIn: true,
    });

    if (error) {
      setErrorMsg(error.message || "Registration failed!");
      return;
    }

    await authClient.signOut();

    // ১. ক্লিক করার সাথে সাথে প্রথমে মেসেজটি শো করবে
    setMessage("Registration successful..!");

    // ২. ফিল্ড ক্লিন এবং রিডাইরেক্ট ১.৫ সেকেন্ড পর একসাথে ঘটবে
    setTimeout(() => {
      formElement.reset();
      setPassword("");
      router.push("/auth/signin");
    }, 1500);
  };

  const handleGoogleSignUp = async () => {
    await authClient.signUp.social({
      provider: "google",
    });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-4 flex justify-center mb-10">
      
      <Card className="border w-full max-w-md sm:max-w-lg py-6 sm:py-8 md:py-10 px-4 sm:px-6 rounded-xl shadow-sm">
        
        <h1 className="text-center text-lg sm:text-2xl font-bold bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
          Create an account
        </h1>
        <p className="text-center text-slate-500 text-sm">
          Fill in the Fields below to get started
        </p>

        <Form
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
          onReset={() => {
            setPassword("");
            setMessage("");
            setErrorMsg("");
          }}
        >
          {/* সাকসেস মেসেজ */}
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
          
          <TextField isRequired name="name">
            <Label className="text-sm sm:text-base">Name</Label>
            <Input placeholder="Enter your name" className="h-10 sm:h-11 text-sm" />
            <FieldError />
          </TextField>

          <TextField isRequired name="image">
            <Label className="text-sm sm:text-base">Image URL</Label>
            <Input placeholder="Image URL" className="h-10 sm:h-11 text-sm" />
            <FieldError />
          </TextField>

          <TextField isRequired name="email">
            <Label className="text-sm sm:text-base">Email</Label>
            <Input placeholder="john@example.com" className="h-10 sm:h-11 text-sm" />
            <FieldError />
          </TextField>

          <TextField isRequired name="password" type="password">
            <Label className="text-sm sm:text-base">Password</Label>
            <Input
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              className="h-10 sm:h-11 text-sm"
            />
            <PasswordChecklist password={password} />
            <FieldError />
          </TextField>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button type="submit" className="w-full h-10 sm:h-11 text-sm bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 text-white font-semibold shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/25">
              <Check />
              Sign Up
            </Button>

            <Button type="reset" variant="secondary" className="w-full h-10 sm:h-11 text-sm">
              Reset
            </Button>
          </div>
        </Form>

        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="text-slate-400 text-xs sm:text-sm">Or</p>

          <Button
            onClick={handleGoogleSignUp}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 h-10 sm:h-11 text-sm border border-slate-200 bg-white/80 hover:border-emerald-200 hover:bg-emerald-50/70"
          >
            <GrGoogle />
            Sign up with Google
          </Button>

          <p className="text-center text-xs sm:text-sm">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-indigo-600 font-bold">
              Login
            </Link>
          </p>
        </div>

      </Card>
    </div>
  );
}