import { TaskManagerContext } from "@/context";
import { callLogoutApi } from "@/services";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const { setUser } = useContext(TaskManagerContext);
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await callLogoutApi();
    if (response?.success) {
      setUser(null);
      navigate("/auth");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl h-16 flex items-center justify-between px-4">

        {/* LEFT: BRAND */}
        <h1
          className="text-lg sm:text-xl font-extrabold tracking-tight text-gray-900 cursor-pointer"
          onClick={() => navigate("/tasks/list")}
        >
          Task Manager
        </h1>

        {/* CENTER: NAVIGATION */}
        <nav className="hidden sm:flex gap-8">
          <NavLink
            to="/tasks/list"
            className={({ isActive }) =>
              `text-base font-semibold transition ${
                isActive
                  ? "text-indigo-600 underline underline-offset-4"
                  : "text-gray-700 hover:text-indigo-600"
              }`
            }
          >
            Tasks
          </NavLink>

          <NavLink
            to="/tasks/scrum-board"
            className={({ isActive }) =>
              `text-base font-semibold transition ${
                isActive
                  ? "text-indigo-600 underline underline-offset-4"
                  : "text-gray-700 hover:text-indigo-600"
              }`
            }
          >
            Scrum Board
          </NavLink>
        </nav>

        {/* RIGHT: LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full p-2 
            hover:bg-red-100 transition group"
          title="Logout"
        >
          <LogOut
            size={20}
            className="text-gray-700 group-hover:text-red-600"
          />
        </button>
      </div>

      {/* MOBILE NAV */}
      <div className="sm:hidden flex justify-center gap-6 py-2 border-t border-gray-200 bg-white">
        <NavLink
          to="/tasks/list"
          className={({ isActive }) =>
            `text-sm font-semibold ${
              isActive ? "text-indigo-600" : "text-gray-700"
            }`
          }
        >
          Tasks
        </NavLink>

        <NavLink
          to="/tasks/scrum-board"
          className={({ isActive }) =>
            `text-sm font-semibold ${
              isActive ? "text-indigo-600" : "text-gray-700"
            }`
          }
        >
          Scrum Board
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
