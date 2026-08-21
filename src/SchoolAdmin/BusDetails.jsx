import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";
import { FaBus } from "react-icons/fa";

export default function BusDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schoolName, setSchoolName] = useState("");
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBus();
  }, []);

  const fetchBus = async () => {
    try {
      const school = JSON.parse(localStorage.getItem("de_authUser"));

      const res = await axios.get(`${API_URL}/buses/${id}`);

      if (res.data.success) {
        // Security check
        if (res.data.bus.school_id !== school.school_id) {
          alert("Unauthorized access");
          navigate("/school/buses");
          return;
        }

        setBus(res.data.bus);

        // Fetch school name
        const schoolsRes = await axios.get(`${API_URL}/schools`);
        const currentSchool = schoolsRes.data.find(
          (s) => s.id === res.data.bus.school_id
        );

        setSchoolName(currentSchool?.school_name || "Unknown School");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load bus details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (!bus) {
    return (
      <div className="text-center py-10 text-red-600 font-semibold">
        Bus not found.
      </div>
    );
  }

  return (
    <div>
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Bus Details</h1>
          <p className="text-gray-500 mt-1">
            View complete bus information
          </p>
        </div>

        <button
          onClick={() => navigate("/school/buses")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Back
        </button>
      </div>

      {/* Card */}

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

        <div className="flex items-center gap-5 mb-8">

          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-3xl">
            <FaBus />
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              {bus.bus_name}
            </h2>

            <p className="text-gray-500">
              {bus.bus_number}
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="text-gray-500">Bus Name</label>
            <p className="font-semibold text-lg">
              {bus.bus_name}
            </p>
          </div>

          <div>
            <label className="text-gray-500">Bus Number</label>
            <p className="font-semibold text-lg">
              {bus.bus_number}
            </p>
          </div>

          <div>
            <label className="text-gray-500">
              Vehicle Registration Number
            </label>
            <p className="font-semibold text-lg">
              {bus.vehicle_registration_number}
            </p>
          </div>

          <div>
            <label className="text-gray-500">
              Vehicle Model
            </label>
            <p className="font-semibold text-lg">
              {bus.vehicle_model}
            </p>
          </div>

          <div>
            <label className="text-gray-500">
              Capacity
            </label>
            <p className="font-semibold text-lg">
              {bus.capacity}
            </p>
          </div>

          {/* <div>
            <label className="text-gray-500">
              Route Number
            </label>
            <p className="font-semibold text-lg">
              {bus.route_number}
            </p>
          </div> */}

          {/* <div>
            <label className="text-gray-500">
              Route Name
            </label>
            <p className="font-semibold text-lg">
              {bus.route_name}
            </p>
          </div> */}

          <div>
            <label className="text-gray-500">
              School
            </label>
            <p className="font-semibold text-lg">
              {schoolName}
            </p>
          </div>

          <div>
            <label className="text-gray-500">
              Status
            </label>

            <div className="mt-2">
              <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                Active
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}