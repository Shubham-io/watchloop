import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function MainLayout() {
  return (
    <div className="h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
