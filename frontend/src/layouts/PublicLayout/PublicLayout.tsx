import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      {/* Public Navbar */}
      <header className="h-16 border-b bg-white shadow-sm flex items-center px-8">

        <h1 className="text-xl font-bold text-blue-600">
          Meridian Field Service Management
        </h1>

      </header>

      {/* Page Content */}
      <main className="flex-1">

        <Outlet />

      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-4 text-center text-sm text-slate-500">

        © 2026 Meridian Field Service Management

      </footer>

    </div>
  );
}