
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";

export default function DriverDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const loggedSchool = JSON.parse(localStorage.getItem("de_authUser"));
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busName, setBusName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  useEffect(() => {
    fetchDriver();
  }, []);

  const fetchDriver = async () => {
    try {
      const res = await axios.get(`${API_URL}/drivers/${id}`);

      // Security check
      if (res.data.school_id !== loggedSchool.school_id) {
        alert("Unauthorized access");
        navigate("/school/drivers");
        return;
      }

      setDriver(res.data);

      // Fetch bus name
      const busRes = await axios.get(`${API_URL}/buses/${res.data.bus_id}`);
      if (busRes.data.success) {
        setBusName(busRes.data.bus.bus_name);
      }

      // Fetch school name using logged-in school_id
      const schoolsRes = await axios.get(`${API_URL}/schools`);
      const school = schoolsRes.data.find(
        (s) => s.id === loggedSchool.school_id
      );

      setSchoolName(school?.school_name || "Unknown School");

    } catch (err) {
      console.error(err);
      alert("Failed to load driver.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading driver...</div>;
  }

  if (!driver) {
    return <div className="p-8 text-center">Driver not found.</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Driver Details</h1>

        <button
          onClick={() => navigate("/school/drivers")}
          className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Back
        </button>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="font-semibold text-gray-500">Driver Name</label>
            <p className="mt-1">{driver.driver_name}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-500">Email</label>
            <p className="mt-1">{driver.email}</p>
          </div>

          {/* <div>
            <label className="font-semibold text-gray-500">Driver ID</label>
            <p className="mt-1">{driver.id}</p>
          </div> */}

          <div>
            <label className="font-semibold text-gray-500">Phone</label>
            <p className="mt-1">{driver.phone}</p>
          </div>

          <div>
            <label className="font-semibold text-gray-500">License Number</label>
            <p className="mt-1">{driver.license_number}</p>
          </div>

          <div>
            <label className="font-semibold text-gray-500">School</label>
            <p className="mt-1">{schoolName}</p>
          </div>

          <div>
            <label className="font-semibold text-gray-500">Bus Name</label>
            <p className="mt-1">{busName}</p>
          </div>

          <div>
            <label className="font-semibold text-gray-500">Status</label>
            <span className="inline-block mt-1 rounded-full bg-green-100 px-3 py-1 text-green-700">
              Active
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}