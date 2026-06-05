"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="w-full bg-[#0a0a0a] px-4 py-3 sticky top-0 z-50">
      {/* Outer Pill-shaped Container - Reference image_016d70.png */}
      <div className="max-w-11/12 mx-auto bg-[#161616] rounded-2xl border border-neutral-800/60 px-6 h-16 flex items-center justify-between">
        
        {/* Left Aligned: Brand / Logo */}
        <div className="flex items-center shrink-0">
          <Link href="/" className="flex items-center select-none">
            {/* Using Next.js Image with fixed dimensions to match image_016d70.png proportions */}
            <div className="relative h-8 w-32"> 
              <Image
                src="/assets/images/logo.png"
                alt="Hire Loop logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Right Aligned: Menu + Divider + Auth */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          {/* Menu Options */}
          <ul className="flex items-center gap-6">
            {navigationLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-neutral-400 hover:text-neutral-200 text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Vertical Divider - Visible in image_016d70.png */}
          <div className="h-5 w-px bg-neutral-700/60 mx-1" />

          {/* Auth Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="text-[#5651f4] hover:text-[#6d69f7] text-sm font-semibold transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-gradient-to-r from-[#5651f4] to-[#6d69f7] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-transform active:scale-95 shadow-md shadow-indigo-600/10 hover:opacity-95"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          className="md:hidden text-neutral-400 hover:text-white focus:outline-none p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl bg-[#161616] border border-neutral-800 rounded-xl p-4 shadow-xl">
          <ul className="flex flex-col gap-1">
            {navigationLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2.5 px-3 text-neutral-300 hover:bg-neutral-800/50 rounded-lg text-base"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="my-3 border-t border-neutral-800" />
          <div className="flex flex-col gap-2">
            <Link href={"/auth/signin"} className="text-center py-2.5 text-[#5651f4] font-semibold">Sign In</Link>
            <Link href={"/auth/signup"} className="text-center bg-gradient-to-r from-[#5651f4] to-[#6d69f7] text-white py-2.5 rounded-xl font-medium">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}