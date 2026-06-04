"use client";

import Link from "next/link";
import Image from "next/image";
import {LogoFacebook, LogoGithub, LogoLinkedin} from "@gravity-ui/icons";

export default function Footer() {
  const sections = [
    {
      title: "Product",
      links: [
        { label: "Job discovery", href: "/jobs" },
        { label: "Worker AI", href: "/ai" },
        { label: "Companies", href: "/companies" },
        { label: "Salary data", href: "/salaries" },
      ],
    },
    {
      title: "Navigations",
      links: [
        { label: "Help center", href: "/help" },
        { label: "Career library", href: "/library" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Brand Guideline", href: "/brand" },
        { label: "Newsroom", href: "/news" },
      ],
    },
  ];

  const socialLinks = [
    { Icon: LogoFacebook, href: "https://facebook.com", bg: "bg-[#161616]" },
    { Icon: LogoGithub, href: "https://github.com", bg: "bg-[#3e34b4]" }, // Highlighted purple box from image
    { Icon: LogoLinkedin, href: "https://linkedin.com", bg: "bg-[#161616]" },
  ];

  return (
    <footer className="w-full bg-[#0a0a0a] text-neutral-400 text-sm py-16 px-6 border-t border-neutral-900/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Branding & Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link href="/" className="flex items-center select-none w-[144px] h-10 relative">
              <Image
                src="/assets/images/logo.png"
                alt="Hire Loop logo"
                fill
                sizes="144px"
                className="object-contain"
                priority
              />
            </Link>
            <p className="text-neutral-500 max-w-sm leading-relaxed text-base font-normal">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h3 className="text-[#3b32c2] font-semibold text-[15px] tracking-wide">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-neutral-500 hover:text-neutral-300 transition-colors text-[14px]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Socials & Copyright */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Social Icons Container using Gravity UI Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-xl ${social.bg} flex items-center justify-center border border-neutral-800/30 hover:brightness-125 transition-all text-neutral-400 hover:text-white`}
              >
                <social.Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Copyright & Policy Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-neutral-600 text-[13px]">
            <p>Copyright 2026 — Programming Hero</p>
            <div className="flex items-center gap-2">
              <Link href="/terms" className="hover:text-neutral-400 transition-colors">Terms & Policy</Link>
              <span>-</span>
              <Link href="/privacy" className="hover:text-neutral-400 transition-colors">Privacy Guideline</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}