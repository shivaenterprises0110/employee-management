import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  FaSchool,
  FaMapMarkerAlt,
  FaBus,
  FaUserTie,
  FaCog,
} from "react-icons/fa";
import axios from "axios";
import API_URL from "../api";
export default function AddSchool() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [school, setSchool] = useState({
    schoolName: "",
    schoolCode: "",
    board: "",
    schoolEmail: "",
    phone: "",
    principal: "",
    city: "",
    state: "",
    pincode: "",
    address: "",

    totalStudents: "",
    totalDrivers: "",
    totalBuses: "",

    adminName: "",
    userId: "",
    password: "",
    confirmPassword: "",

    status: "Active",
    plan: "Premium",
  });

  const handleChange = (e) => {
    setSchool({
      ...school,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (school.password !== school.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(school.password)) {
      alert(
        "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character."
      );
      return;
    }
    try {
      await axios.post(`${API_URL}/schools`, {
        school_name: school.schoolName,
        school_code: school.schoolCode,
        email: school.schoolEmail,
        phone: school.phone,
        address: school.address,

        admin_name: school.adminName,
        user_id: school.userId,
        password: school.password,
      });

      alert("School Added Successfully");

      navigate("/superdashboard/schools");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message
      );
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white p-8 shadow-lg">

        <h1 className="text-4xl font-bold">
          Add New School
        </h1>

        <p className="text-blue-100 mt-3 text-lg">
          Register a new school, create administrator credentials and configure transport information.
        </p>

      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* School Information */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="bg-blue-50 border-b px-6 py-4 flex items-center gap-3">

            <FaSchool className="text-blue-600 text-2xl" />

            <h2 className="text-2xl font-bold text-gray-800">
              School Information
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">

            <div>

              <label className="block mb-2 font-medium">
                School Name
              </label>

              <input
                type="text"
                name="schoolName"
                value={school.schoolName}
                onChange={handleChange}
                placeholder="Green Valley Public School"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                School Code
              </label>

              <input
                type="text"
                name="schoolCode"
                value={school.schoolCode}
                onChange={handleChange}
                placeholder="GVPS001"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                School Email
              </label>

              <input
                type="email"
                name="schoolEmail"
                value={school.schoolEmail}
                onChange={handleChange}
                placeholder="school@email.com"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={school.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

          </div>

        </div>
        {/* Address Information */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="bg-green-50 border-b px-6 py-4 flex items-center gap-3">

            <FaMapMarkerAlt className="text-green-600 text-2xl" />

            <h2 className="text-2xl font-bold text-gray-800">
              Address Information
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">

            <div className="md:col-span-2">

              <label className="block mb-2 font-medium">
                School Address
              </label>

              <textarea
                rows="4"
                name="address"
                value={school.address}
                onChange={handleChange}
                placeholder="Enter complete school address"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                City
              </label>

              <input
                type="text"
                name="city"
                value={school.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                State
              </label>

              <input
                type="text"
                name="state"
                value={school.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={school.pincode}
                onChange={handleChange}
                placeholder="560001"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

          </div>

        </div>

        {/* School Admin Credentials */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="bg-purple-50 border-b px-6 py-4 flex items-center gap-3">

            <FaUserTie className="text-purple-600 text-2xl" />

            <h2 className="text-2xl font-bold text-gray-800">
              School Admin Credentials
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">

            <div>

              <label className="block mb-2 font-medium">
                Admin Name
              </label>

              <input
                type="text"
                name="adminName"
                value={school.adminName}
                onChange={handleChange}
                placeholder="Admin Name"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            {/* <div>

              <label className="block mb-2 font-medium">
                User ID
              </label>

              <input
                type="text"
                name="userId"
                value={school.userId}
                onChange={handleChange}
                placeholder="schooladmin001"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div> */}

            <div>

              <label className="block mb-2 font-medium">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={school.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 pr-12 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>


            </div>

            <div>

              <label className="block mb-2 font-medium">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={school.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 pr-12 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Action Buttons */}

        <div className="flex flex-wrap justify-end gap-4">

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold transition"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm("Are you sure you want to cancel?")) {
                navigate("/superdashboard");
              }
            }}
            className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold shadow-lg transition"
          >
            Save School
          </button>

        </div>

      </form>

    </div>
  );
}

{/* Part 3 Starts Here */ }

{/* Part 2 Starts Here */ }