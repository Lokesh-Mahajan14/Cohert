import { Outlet } from "react-router-dom";
import Header from "../header/index";

function CommonLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top header */}
      <Header />

      {/* Page content area */}
      <main className="flex-1 p-4">
        <div className=""></div>
        <Outlet />
      </main>
    </div>
  );
}

export default CommonLayout;
