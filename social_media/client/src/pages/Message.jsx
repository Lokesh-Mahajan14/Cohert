import React from "react";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen border-r bg-white flex flex-col p-6">
      
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-3xl text-indigo-600">⚡</span>
        <h1 className="text-2xl font-bold text-indigo-600">pingup</h1>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-4 text-gray-700 font-medium">
        <button className="text-left hover:text-indigo-600">Feed</button>
        <button className="text-left hover:text-indigo-600">Messages</button>
        <button className="text-left hover:text-indigo-600">Notifications</button>
        <button className="text-left hover:text-indigo-600">Profile</button>
        <button className="text-left hover:text-indigo-600">Settings</button>
      </nav>

      {/* Push bottom space */}
      <div className="flex-1" />

      {/* Logout */}
      <button className="text-left text-red-600 hover:text-red-700">
        Logout
      </button>
    </div>
  );
}
