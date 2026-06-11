import { DashboardSidebarClient } from "@/components/dashboard/DashboardSidebarClient";

export default function RecruiterDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white lg:flex">
      <DashboardSidebarClient />

      <main className="min-w-0 flex-1 px-4 pb-6 pt-[156px] sm:px-5 lg:px-8 lg:py-6">
        {children}
      </main>
    </div>
  );
}