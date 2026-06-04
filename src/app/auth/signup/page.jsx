"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Button, Alert } from "@heroui/react";
import { Person, Envelope, Lock, Eye, EyeSlash } from "@gravity-ui/icons";
// আপনার better-auth ক্লায়েন্ট ইমপোর্ট পাথটি এখানে মিলিয়ে নিন
import { authClient } from "@/lib/auth-client"; 

export default function SignupPage() {
  const router = useRouter();
  
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // UI States
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // বেসিক ভ্যালিডেশন
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard", // সফল সাইন-আপের পর যেখানে রিডাইরেক্ট হবে
      });

      if (authError) {
        setError(authError.message || "Something went wrong during signup.");
      } else {
        setSuccess("Account created successfully! Redirecting...");
        // ফর্ম ক্লিয়ার করা
        setName("");
        setEmail("");
        setPassword("");
        
        // ২ সেকেন্ড পর ড্যাশবোর্ড বা হোম পেজে রিডাইরেক্ট
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030303] flex items-center justify-center px-4 overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-150 h-75 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <Card className="w-full max-w-md bg-[#09090b]/80 backdrop-blur-xl border border-neutral-900/80 p-6 sm:p-8 rounded-[24px] shadow-2xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col gap-1 mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Create an Account
          </h1>
          <p className="text-sm text-neutral-400">
            Enter your details to get started
          </p>
        </div>

        {/* Dynamic Alerts */}
        <div className="flex flex-col gap-3 mb-4">
          {error && (
            <Alert color="danger" variant="flat" title={error} />
          )}
          {success && (
            <Alert color="success" variant="flat" title={success} />
          )}
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          
          {/* Full Name Input */}
          <div className="flex flex-col gap-2">
            <label className="px-1 text-sm text-neutral-400">Full Name</label>
            <div className="relative w-full">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-neutral-500">
                <Person className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 w-full rounded-xl border border-neutral-800 bg-transparent pl-11 pr-4 text-white outline-none transition-colors placeholder:text-neutral-600 hover:border-neutral-700 focus:border-neutral-600"
              />
            </div>
          </div>

          {/* Email Address Input */}
          <div className="flex flex-col gap-2">
            <label className="px-1 text-sm text-neutral-400">Email Address</label>
            <div className="relative w-full">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-neutral-500">
                <Envelope className="w-4 h-4" />
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 w-full rounded-xl border border-neutral-800 bg-transparent pl-11 pr-4 text-white outline-none transition-colors placeholder:text-neutral-600 hover:border-neutral-700 focus:border-neutral-600"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label className="px-1 text-sm text-neutral-400">Password</label>
            <div className="relative w-full">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-neutral-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={isVisible ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 w-full rounded-xl border border-neutral-800 bg-transparent pl-11 pr-12 text-white outline-none transition-colors placeholder:text-neutral-600 hover:border-neutral-700 focus:border-neutral-600"
              />
              <button 
                type="button" 
                onClick={toggleVisibility} 
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 focus:outline-none text-neutral-500 hover:text-neutral-400"
              >
                {isVisible ? (
                  <EyeSlash className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            color="primary"
            className="w-full font-medium h-12 rounded-xl mt-2 bg-white text-black hover:bg-neutral-200"
            isLoading={isLoading}
          >
            Sign Up
          </Button>
        </form>

        {/* Toggle to Sign In */}
        <div className="mt-6 text-center text-sm text-neutral-400">
          Already have an account?{" "}
          <Link 
            href="/signin" 
            className="text-white font-medium hover:underline transition-all"
          >
            Sign In
          </Link>
        </div>

      </Card>
    </div>
  );
}