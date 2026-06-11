"use client";

import {
  LayoutSideContentLeft,
  Gear,
  House,
  Briefcase,
  Envelope,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const navItems = [
    {
      icon: House,
      label: "Dashboard",
      href: "/dashboard/recruiter",
    },
    {
      icon: Person,
      label: "My Company",
      href: "/dashboard/recruiter/company",
    },
    {
      icon: Briefcase,
      label: "Manage Jobs",
      href: "/dashboard/recruiter/jobs",
    },
    {
      icon: Envelope,
      label: "Applications",
      href: "/dashboard/recruiter/applications",
    },
    {
      icon: Gear,
      label: "Settings",
      href: "/dashboard/recruiter/settings",
    },
  ];

  const formatRole = (role) => {
    if (!role) return "Recruiter";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const navContent = (
    <div className="flex h-full flex-col bg-[#101011] text-white">
      {/* Brand */}
      <div className="border-b border-neutral-800 px-6 py-6">
        <Link href="/" className="inline-flex items-center">
          <span className="text-[24px] font-bold tracking-tight text-white">
            HireLoop
          </span>
        </Link>
      </div>

      {/* User Info */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-3 rounded-2xl border border-neutral-800 bg-[#171719] p-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-neutral-700 bg-neutral-800">
            {!isPending && user?.image ? (
              <Image
                src={user.image}
                alt={user?.name || "User profile"}
                fill
                sizes="44px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-neutral-300">
                {!isPending ? user?.name?.charAt(0) || "U" : "U"}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight text-white">
              {isPending ? "Loading..." : user?.name || "User"}
            </p>

            <p className="mt-1 text-xs leading-tight text-neutral-400">
              {formatRole(user?.role)}
            </p>
          </div>
        </div>

        <div className="mt-3 inline-flex rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-300">
          Premium Account
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard/recruiter" &&
              pathname?.startsWith(item.href));

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white text-black shadow-[0_8px_24px_rgba(255,255,255,0.08)]"
                  : "text-neutral-400 hover:bg-[#1f1f21] hover:text-white"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-[#19191b] text-neutral-400 group-hover:bg-[#2a2a2d] group-hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>

              <span className="truncate">{item.label}</span>

              {isActive && (
                <span className="absolute right-2 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-black" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden h-screen w-[240px] shrink-0 border-r border-neutral-800 bg-[#101011] lg:sticky lg:top-0 lg:block">
        {navContent}
      </aside>

      {/* Mobile Sidebar Button - navbar er niche */}
      <div className="fixed left-4 top-[96px] z-40 lg:hidden">
        <Drawer>
          <Button
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-neutral-800 bg-[#161616] px-3 text-sm font-medium text-white shadow-lg shadow-black/30 hover:bg-[#202022]"
            variant="secondary"
          >
            <LayoutSideContentLeft className="h-4 w-4" />
            Menu
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog className="h-screen w-[260px] bg-[#101011] p-0 shadow-2xl shadow-black/60">
                <Drawer.CloseTrigger />
                <Drawer.Body className="p-0">{navContent}</Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}