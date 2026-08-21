import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";
export default function AddStudent() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (student.password !== student.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/students`, {
        student_name: student.student_name,
        parent_name: student.parent_name,
        parent_phone: student.parent_phone,
        parent_email: student.parent_email,
        parent_password: student.password,
        school_id: student.school_id,
        bus_id: student.bus_id,
        pickup_point: student.pickup_point,
        drop_point: student.drop_point,
      });

      alert(res.data.message);
      navigate("/school/dashboard");

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to add student"
      );
    }
  };
  const [student, setStudent] = useState({
    student_name: "",
    parent_name: "",
    parent_phone: "",
    parent_email: "",
    password: "",
    confirmPassword: "",
    school_id: "",
    bus_id: "",
    pickup_point: "",
    drop_point: "",
  });

  const [selectedDriver, setSelectedDriver] = useState("");
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const school = JSON.parse(localStorage.getItem("de_authUser"));

    console.log("Logged School:", school);

    if (school?.school_id) {
      setStudent((prev) => ({
        ...prev,
        school_id: school.school_id,
      }));

      fetchDrivers(school.school_id);
    }
  }, []);

  const fetchDrivers = async (schoolId) => {
    try {
      const res = await axios.get(
        `${API_URL}/drivers/school/${schoolId}`
      );

      console.log("Drivers:", res.data);
      setDrivers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Add Student</h1>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Student Information */}

          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-blue-600 border-b pb-2">
              Student Information
            </h2>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Student Name
            </label>

            <input
              type="text"
              value={student.student_name}
              onChange={(e) =>
                setStudent({ ...student, student_name: e.target.value })
              }
              placeholder="Enter student name"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div>

          {/* <div>
            <label className="block mb-2 font-medium text-gray-700">
              Student ID
            </label>

            <input
              type="text"
              placeholder="Enter student ID"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div> */}

          {/* <div>
            <label className="block mb-2 font-medium text-gray-700">
              School Name
            </label>

            <input
              type="text"
              placeholder="Enter school name"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div> */}

          {/* Parent Information */}

          <div className="md:col-span-2 mt-2">
            <h2 className="text-xl font-semibold text-green-600 border-b pb-2">
              Parent Information
            </h2>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Parent Name
            </label>

            <input
              type="text"
              value={student.parent_name}
              onChange={(e) =>
                setStudent({ ...student, parent_name: e.target.value })
              }
              placeholder="Enter parent name"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Parent Phone Number
            </label>

            <input
              type="tel"
              value={student.parent_phone}
              onChange={(e) =>
                setStudent({ ...student, parent_phone: e.target.value })
              }
              placeholder="Enter phone number"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Parent Email
            </label>

            <input
              type="email"
              value={student.parent_email}
              onChange={(e) =>
                setStudent({ ...student, parent_email: e.target.value })
              }
              placeholder="Enter parent email"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div>

          {/* Transport Information */}

          <div className="md:col-span-2 mt-2">
            <h2 className="text-xl font-semibold text-purple-600 border-b pb-2">
              Transport Information
            </h2>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Pickup Location
            </label>

            <input
              type="text"
              value={student.pickup_point}
              onChange={(e) =>
                setStudent({ ...student, pickup_point: e.target.value })
              }
              placeholder="Pickup location"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Assigned Driver
            </label>

            <select
              value={selectedDriver}
              onChange={(e) => {
                const driverId = e.target.value;

                setSelectedDriver(driverId);

                const driver = drivers.find((d) => d.id === driverId);

                setStudent((prev) => ({
                  ...prev,
                  bus_id: driver?.bus_id || "",
                }));
              }}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Select Driver</option>

              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.driver_name} ({driver.phone})
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
              User ID
            </label>

            <input
              type="text"
              placeholder="Enter user ID"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div> */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={student.password}
              onChange={(e) =>
                setStudent({ ...student, password: e.target.value })
              }
              placeholder="Enter password"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              value={student.confirmPassword}
              onChange={(e) =>
                setStudent({ ...student, confirmPassword: e.target.value })
              }
              placeholder="Confirm password"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div>

          <div className="md:col-span-2 mt-4 gap-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg"
            >
              Save Student
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