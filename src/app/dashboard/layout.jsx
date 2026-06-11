import { DashboardSidebarClient } from "@/components/dashboard/DashboardSidebarClient";

export default function RecruiterDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0b0b0c] text-white">
      <DashboardSidebarClient />

      <main className="min-w-0 flex-1 px-5 py-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}