"use client";

import dynamic from "next/dynamic";
import { LayoutSideContentLeft } from "@gravity-ui/icons";

const DashboardSidebar = dynamic(
  () => import("@/components/dashboard/DashboardSidebar"),
  {
    ssr: false,
    loading: () => (
      <>
        <aside className="hidden h-screen w-[240px] shrink-0 border-r border-neutral-800 bg-[#101011] lg:sticky lg:top-0 lg:block" />

        <div className="fixed left-4 top-[96px] z-40 lg:hidden">
          <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-neutral-800 bg-[#161616] px-3 text-sm font-medium text-white shadow-lg shadow-black/30">
            <LayoutSideContentLeft className="h-4 w-4" />
            Menu
          </button>
        </div>
      </>
    ),
  }
);

export function DashboardSidebarClient() {
  return <DashboardSidebar />;
}