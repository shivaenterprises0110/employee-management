import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";
export default function AddDriver() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const loggedSchool = JSON.parse(localStorage.getItem("de_authUser"));

  const [driver, setDriver] = useState({
    driver_name: "",
    phone: "",
    email: "",
    license_number: "",
    bus_id: "",
    school_id: loggedSchool?.school_id || "",
    password: "",
    confirmPassword: "",
  });

  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/buses/school/${loggedSchool.school_id}`
      );

      setBuses(res.data.buses);
    } catch (err) {
      console.error("Failed to fetch buses:", err);
    }
  };

  const handleChange = (e) => {
    setDriver({
      ...driver,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (driver.password !== driver.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(driver.password)) {
      alert(
        "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      await axios.post(`${API_URL}/drivers`, {
        driver_name: driver.driver_name,
        email: driver.email,
        password: driver.password,
        phone: driver.phone,
        license_number: driver.license_number,
        school_id: driver.school_id,
        bus_id: driver.bus_id,
      });

      alert("Employee Added Successfully");

      navigate("/school/dashboard");
    } catch (err) {
      console.error("Employee Error:", err.response?.data);

      alert(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to add employee"
      );
    }
  };
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Add Employee</h1>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Driver Information */}

          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-blue-600 border-b pb-2">
              Employee Information
            </h2>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Employee Name
            </label>

            <input
              type="text"
              name="driver_name"
              value={driver.driver_name}
              onChange={handleChange}
              placeholder="Enter employee name"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={driver.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={driver.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div>

          {/* <div>
            <label className="block mb-2 font-medium text-gray-700">
              License Number
            </label>

            <input
              type="text"
              name="license_number"
              value={driver.license_number}
              onChange={handleChange}
              placeholder="Driving license number"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div> */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              E-ID 
            </label>

            <select
              name="bus_id"
              value={driver.bus_id}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            >
              <option value="">Select E-ID</option>

              {buses.map((bus) => (
                <option key={bus.id} value={bus.id}>
                  {bus.bus_number} - {bus.vehicle_registration_number}
                </option>
              ))}
            </select>
          </div>

          {/* Login Credentials */}

          <div className="md:col-span-2 mt-2">
            <h2 className="text-xl font-semibold text-red-600 border-b pb-2">
              Login Credentials
            </h2>
          </div>

          {/* <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email ID
            </label>

            <input
              type="text"
              placeholder="Enter email ID"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div> */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={driver.password}
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
            <label className="block mb-2 font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={driver.confirmPassword}
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

          <div className="md:col-span-2 mt-4 gap-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg"
            >
              Save Driver
            </button>
            <button
              type="button"
              onClick={() => navigate("/school/dashboard")}
              className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg"
            >
              Cancle
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}