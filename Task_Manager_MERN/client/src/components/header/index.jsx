import { TaskManagerContext } from "@/context";
import { callLogoutApi } from "@/services";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const {setUser}=useContext(TaskManagerContext)
  const navigate=useNavigate();
    async function handleLogout(){
        const response=await callLogoutApi();
        if(response?.success){
            setUser(null)
            navigate('/auth');

            
        }

    }



  return (
    

    <header className="border-b border-gray-300 bg-white">
      <div className="container mx-auto h-16 flex items-center justify-between px-4">
        
        {/* Left: Title */}
        <h1 className="text-lg font-semibold">Task Manager</h1>
        
        {/* Middle: Navigation */}
        <nav className="flex gap-6">
          <Link to="/tasks/list" className="text-black text-lg font-bold hover:underline">
            Tasks
          </Link>
          <Link to="/tasks/scrum-board" className="text-black text-lg font-bold hover:underline">
            Scrum Board
          </Link>
        </nav>
        
        {/* Right: Logout */}
        <LogOut onClick={handleLogout} color="#000" className="cursor-pointer" />
      </div>
    </header>
  );
}

export default Header;
