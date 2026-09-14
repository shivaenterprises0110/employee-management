
// COMPLETE UPDATED DriverList.jsx
// Replace your existing DriverList.jsx with this file.

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import API_URL from "../api";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DriverList() {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      setError("");

      const school = JSON.parse(localStorage.getItem("de_authUser"));

      // Drivers of logged-in school
      const driverRes = await axios.get(
        `${API_URL}/drivers/school/${school.school_id}`
      );

      // Buses of logged-in school
      const busRes = await axios.get(
        `${API_URL}/buses/school/${school.school_id}`
      );

      setDrivers(driverRes.data || []);
      setBuses(busRes.data.buses || []);

    } catch (err) {
      console.error(err);
      setError("Failed to load Employees.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(`${API_URL}/drivers/${id}`);
      alert("Employee deleted successfully.");
      fetchDrivers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to delete employee.");
    }
  };

  const filteredDrivers = useMemo(() => {
    const q = search.toLowerCase();
    return drivers.filter((d) =>
      d.driver_name?.toLowerCase().includes(q) ||
      d.phone?.toLowerCase().includes(q) ||
      d.license_number?.toLowerCase().includes(q)
    );
  }, [drivers, search]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Drivers</h1>
          <p className="text-gray-500 mt-1">Manage all registered drivers</p>
        </div>
        <div className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow">
          Total Drivers : {filteredDrivers.length}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search driver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 bg-gray-50"
          />
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center">Loading...</div>
      ) : error ? (
        <div className="p-8 text-center text-red-600">{error}</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4 text-center">Driver</th>
                {/* <th className="p-4">ID</th> */}
                <th className="p-4 text-center">Phone</th>
                {/* <th className="p-4">License</th> */}
                <th className="p-4 text-center">Bus</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => (
                <tr key={driver.id} className="border-b">
                  <td className="p-4 text-center"> {driver.driver_name}</td>
                  {/* <td className="p-4">{driver.id}</td> */}
                  <td className="p-4 text-center">{driver.phone}</td>
                  {/* <td className="p-4">{driver.license_number}</td> */}
                  <td className="p-4 text-center"> {buses.find((b) => b.id === driver.bus_id)?.bus_name || "Not Assigned"}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => navigate(`/school/drivers/view/${driver.id}`)}
                        className="text-blue-600 hover:text-blue-800">
                        <FaEye />
                      </button>

                      <button
                        onClick={() => navigate(`/school/drivers/edit/${driver.id}`)}
                        className="text-green-600 hover:text-green-800">
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => handleDelete(driver.id)}
                        className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
