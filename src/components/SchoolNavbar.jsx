import { useState, useRef, useEffect } from "react";
import {
  FaBell,
  FaBars,
  FaUserEdit,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SchoolNavbar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Temporary user
  // Later replace with loggedInUser

  const user = {
    name: "School Admin",
    role: "Administrator",
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div className="bg-white shadow rounded-xl px-6 py-4 flex items-center justify-between mb-8">

      {/* Left */}

      <div className="flex items-center gap-5">

        <button
          onClick={() => setSidebarOpen(true)}
          className="text-2xl hover:text-blue-600 transition"
        >
          <FaBars />
        </button>

        <div>

          <h1 className="text-2xl font-bold text-slate-800">
            Employee Admin Dashboard
          </h1>

          <p className="text-gray-500 text-sm">
            Welcome back!
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <div className="hidden md:block text-gray-600">
          📅 {today}
        </div>

        {/* <button className="relative">

          <FaBell className="text-2xl text-gray-700" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
            3
          </span>

        </button> */}

        {/* <div className="relative" ref={dropdownRef}> */}

          {/* <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3"
          >

            <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="hidden md:block text-left">

              <h3 className="font-semibold">
                {user.name}
              </h3>

              <p className="text-xs text-gray-500">
                {user.role}
              </p>

            </div>

          </button> */}

          {/* {open && (

            <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-xl border overflow-hidden z-50">

              <button className="flex items-center gap-3 w-full px-5 py-3 hover:bg-gray-100 transition">

                <FaUserEdit className="text-blue-600" />

                Edit Profile

              </button>

              <button onClick={() => navigate("/login")} className="flex items-center gap-3 w-full px-5 py-3 hover:bg-red-50 text-red-600 transition">

                <FaSignOutAlt />

                Logout

              </button>

            </div>

          )} */}

        {/* </div> */}

      </div>

    </div>
  );
}