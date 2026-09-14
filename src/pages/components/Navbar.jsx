// src/components/Navbar.jsx
import { HiMenu, HiX } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const profileRef = useRef(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const raw = localStorage.getItem("de_authUser");

        if (raw) {
          const u = JSON.parse(raw);

          setUser({
            name: u.fullName || u.email || "User",
          });
        } else {
          setUser({
            name: "User",
          });
        }
      } catch {
        setUser({
          name: "User",
        });
      }
    }
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("de_authUser");

      if (raw) {
        const u = JSON.parse(raw);

        setUser({
          name: u.name || u.email || "User",
          role: u.role || "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);

    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent px-4 md:px-8 py-4">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center space-x-2">

          <img
            src="https://cviefvnvftkewddwuktu.supabase.co/storage/v1/object/sign/visiontrack/Ticon.png?token=eyJraWQiOiI5ZmNjOGQ1OC04MDVmLTQyNTYtOTgyYS00NDU3MDZhZGFhNzkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aXNpb250cmFjay9UaWNvbi5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5MzY5NTAxLCJleHAiOjE4MjA5MDU1MDF9.vF4Tq_LshvwFOjpGz--PV6f7gg7TjWlMZFZ7u3YViIg"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 animate-bounce"
            alt="SchoolBusTracker Logo"
          />

          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-yellow-400 drop-shadow-lg whitespace-nowrap">
            VisionTrack
          </h1>

        </div>
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden text-white"
        >
          {mobileMenu ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
        {/* Links */}

        <div className="hidden md:flex items-center space-x-8 text-lg">

          <a
            href="#"
            className="hover:text-yellow-400 transition"
          >
            Home
          </a>

          {/* <Link
          to="/join-ngo"
          className="hover:text-yellow-400 transition"
        >
          Join as NGO
        </Link> */}

          <a
            href="#about"
            className="hover:text-yellow-400 transition"
          >
            About Us
          </a>

          <a
            href="#contact"
            className="hover:text-yellow-400 transition"
          >
            Contact Us
          </a>

          {!user ? (
            <Link
              to="/login"
              className="hover:text-yellow-400 transition"
            >
              Login / Register
            </Link>
          ) : (
            <div
              ref={profileRef}
              className="relative"
            >
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-sm"
              >
                <span className="inline-grid place-items-center w-7 h-7 rounded-full bg-yellow-400 text-black font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>

                <span className="hidden md:block">
                  {user.name}
                </span>

                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-xl text-gray-700 overflow-hidden">

                  <Link
                    to="/school/dashboard"
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>

                  {/* <Link
                    to="/auth/profile"
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    Edit Profile
                  </Link> */}

                  <div className="border-t" />

                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          )}

        </div>
      </div>
      {mobileMenu && (
        <div className="md:hidden mt-4 bg-black/90 backdrop-blur-lg rounded-xl p-5 space-y-4 text-white shadow-xl">

          <a
            href="#"
            className="block hover:text-yellow-400"
            onClick={() => setMobileMenu(false)}
          >
            Home
          </a>

          <a
            href="#about"
            className="block hover:text-yellow-400"
            onClick={() => setMobileMenu(false)}
          >
            About Us
          </a>

          <a
            href="#contact"
            className="block hover:text-yellow-400"
            onClick={() => setMobileMenu(false)}
          >
            Contact Us
          </a>

          {!user ? (
            <Link
              to="/login"
              className="block hover:text-yellow-400"
              onClick={() => setMobileMenu(false)}
            >
              Login / Register
            </Link>
          ) : (
            <>
              <Link
                to="/school/dashboard"
                className="block hover:text-yellow-400"
                onClick={() => setMobileMenu(false)}
              >
                Dashboard
              </Link>

              <Link
                to="/auth/profile"
                className="block hover:text-yellow-400"
                onClick={() => setMobileMenu(false)}
              >
                Edit Profile
              </Link>

              <button
                onClick={() => {
                  logout();
                  setMobileMenu(false);
                }}
                className="block text-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}