
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";

export default function EditDriver() {
  const { id } = useParams();
  const navigate = useNavigate();
  const loggedSchool = JSON.parse(localStorage.getItem("de_authUser"));
  const [driver, setDriver] = useState({
    driver_name: "",
    phone: "",
    license_number: "",
    school_id: loggedSchool?.school_id || "",
    bus_id: "",
  });

  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchDriver();
    fetchBuses();
  }, []);

  const fetchDriver = async () => {
    try {
      const res = await axios.get(`${API_URL}/drivers/${id}`);
      setDriver({
        driver_name: res.data.driver_name || "",
        phone: res.data.phone || "",
        license_number: res.data.license_number || "",
        school_id: loggedSchool.school_id,
        bus_id: res.data.bus_id || "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load driver.");
    }
  };

  const fetchBuses = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/buses/school/${loggedSchool.school_id}`
      );

      setBuses(res.data.buses || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}/drivers/${id}`, driver);
      alert("Employee updated successfully.");
      navigate("/school/drivers");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to update employee.");
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Edit Employee</h1>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div className="md:col-span-2">
            <h2 className="border-b pb-2 text-xl font-semibold text-blue-600">
              Employee Information
            </h2>
          </div>

          <div>
            <label className="mb-2 block font-medium">Employee Name</label>
            <input
              type="text"
              name="driver_name"
              value={driver.driver_name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={driver.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">License Number</label>
            <input
              type="text"
              name="license_number"
              value={driver.license_number}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Bus</label>
            <select
              name="bus_id"
              value={driver.bus_id}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            >
              <option value="">Select Bus</option>
              {buses.map((bus) => (
                <option key={bus.id} value={bus.id}>
                  {bus.bus_number} - {bus.vehicle_registration_number}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="submit"
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Update Employee
            </button>

            <button
              type="button"
              onClick={() => navigate("/school/drivers")}
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
