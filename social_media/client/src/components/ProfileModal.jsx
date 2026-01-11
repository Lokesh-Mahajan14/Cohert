import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { Pencil } from "lucide-react";

function ProfileModal({ setShowModal }) { // ✅ renamed prop
  const user = dummyUserData;

  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location,
    profile_picture: null,
    cover_photo: null,
    full_name: user.full_name,
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    console.log(editForm);
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto">
      <div className="max-w-2xl mx-auto py-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

          {/* ✅ DO NOT CALL FUNCTION */}
          <form onSubmit={handleSaveProfile} className="space-y-4">

            <button
              type="button"
              onClick={() => setShowModal(false)} // ✅ correct
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg"
            >
              Save Changes
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
