"use client";

import dynamic from "next/dynamic";

const DashboardSidebar = dynamic(
  () =>
    import("@/components/dashboard/DashboardSidebar").then(
      (mod) => mod.DashboardSidebar
    ),
  {
    ssr: false,
    loading: () => (
      <>
        <aside className="hidden h-screen w-[240px] shrink-0 border-r border-neutral-800 bg-[#101011] lg:block" />

        <div className="lg:hidden">
          <button className="m-3 rounded-xl border border-neutral-800 bg-[#161616] px-4 py-2 text-sm text-white">
            Sidebar
          </button>
        </div>
      </>
    ),
  }
);

export function DashboardSidebarClient() {
  return <DashboardSidebar />;
}