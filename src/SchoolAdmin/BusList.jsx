
// Updated BusList.jsx
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import API_URL from "../api";
import { FaEye, FaEdit, FaTrash, FaSearch, FaBus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function BusList() {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBuses = async () => {
    try {
      setLoading(true);
      setError("");

      const school = JSON.parse(localStorage.getItem("de_authUser"));
      console.log("Logged School:", school);
      console.log("School ID:", school?.school_id);
      const res = await axios.get(
        `${API_URL}/buses/school/${school.school_id}`
      );

      setBuses(res.data.buses || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load buses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bus?")) return;
    try {
      await axios.delete(`${API_URL}/buses/${id}`);
      alert("Bus deleted successfully.");
      fetchBuses();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to delete bus.");
    }
  };

  const filteredBuses = useMemo(() => {
    const q = search.toLowerCase();
    return buses.filter((b) =>
      b.bus_name?.toLowerCase().includes(q) ||
      b.bus_number?.toLowerCase().includes(q) ||
      b.vehicle_model?.toLowerCase().includes(q)
    );
  }, [buses, search]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">E-Id List</h1>
          <p className="text-gray-500 mt-1">Manage all registered school buses</p>
        </div>
        <div className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow">
          Total E-Ids : {filteredBuses.length}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search bus..."
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
        <>
          <div className="hidden md:block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-4">Employee</th>
                  <th className="p-4">ID</th>
                  {/* <th className="p-4">Model</th>
                  <th className="p-4">Capacity</th>
                  <th className="p-4"></th> */}
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBuses.map((bus, i) => (
                  <tr key={bus.id || bus.bus_id || i} className="border-b hover:bg-blue-50">
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700"><FaBus /></div>
                        {bus.bus_name}
                      </div>
                    </td>
                    <td className="p-4 text-center">{bus.bus_number}</td>
                    {/* <td className="p-4 text-center">{bus.vehicle_model}</td>
                    <td className="p-4 text-center">{bus.capacity}</td>
                    <td className="p-4 text-center">{bus.route_number}</td> */}
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <button onClick={() => navigate(`/school/buses/view/${bus.id || bus.bus_id}`)} className="text-blue-600"><FaEye /></button>
                        <button onClick={() => navigate(`/school/buses/edit/${bus.id || bus.bus_id}`)} className="text-green-600"><FaEdit /></button>
                        <button onClick={() => handleDelete(bus.id || bus.bus_id)} className="text-red-600"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4 mt-6">
            {filteredBuses.map((bus, i) => (
              <div key={bus.id || bus.bus_id || i} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700"><FaBus /></div>
                  <div>
                    <h3 className="font-semibold">{bus.bus_name}</h3>
                    <p className="text-sm text-gray-500">{bus.bus_number}</p>
                  </div>
                </div>

                <div className="flex justify-center gap-4 mt-5">
                  <button onClick={() => navigate(`/school/buses/view/${bus.id || bus.bus_id}`)} className="text-blue-600"><FaEye /></button>
                  <button onClick={() => navigate(`/school/buses/edit/${bus.id || bus.bus_id}`)} className="text-green-600"><FaEdit /></button>
                  <button onClick={() => handleDelete(bus.id || bus.bus_id)} className="text-red-600"><FaTrash /></button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
