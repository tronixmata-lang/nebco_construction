import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell flex min-h-screen">
      <AdminSidebar />
      <main className="admin-main flex-1 overflow-x-hidden">
        <div className="admin-main-inner mx-auto max-w-6xl p-6 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
