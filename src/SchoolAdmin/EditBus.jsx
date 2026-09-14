import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";

export default function EditBus() {
  const { id } = useParams();
  const navigate = useNavigate();
 const loggedSchool = JSON.parse(localStorage.getItem("de_authUser"));
 

  const [bus, setBus] = useState({
    bus_number: "",
    bus_name: "",
    vehicle_registration_number: "",
    vehicle_model: "",
    capacity: "1",
    route_number: "",
    route_name: "",
    school_id: loggedSchool?.school_id || "",
  });

  useEffect(() => {
    loadBus();
  }, []);

  const loadBus = async () => {
  try {
    const res = await axios.get(`${API_URL}/buses/${id}`);

    if (res.data.success) {
      setBus({
        ...res.data.bus,
        school_id: loggedSchool.school_id,
      });
    }
  } catch (err) {
    console.error(err);
    alert("Failed to load bus.");
  }
};

  const handleChange = (e) => {
    setBus({
      ...bus,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}/buses/${id}`, bus);

      alert("E-Id updated successfully.");

      navigate("/school/buses");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to update e-id.");
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl lg:text-4xl">
        Edit E-Id
      </h1>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-lg sm:p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div className="md:col-span-2">
            <h2 className="border-b pb-2 text-xl font-semibold text-blue-600">
              E-Id Information
            </h2>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Employee Number
            </label>

            <input
              type="text"
              name="bus_number"
              value={bus.bus_number}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Employee Name
            </label>

            <input
              type="text"
              name="bus_name"
              value={bus.bus_name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div>

          {/* <div>
            <label className="mb-2 block font-medium">
              Vehicle Registration Number
            </label>

            <input
              type="text"
              name="vehicle_registration_number"
              value={bus.vehicle_registration_number}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div> */}

          {/* <div>
            <label className="mb-2 block font-medium">
              Vehicle Model
            </label>

            <input
              type="text"
              name="vehicle_model"
              value={bus.vehicle_model}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div> */}

          {/* <div>
            <label className="mb-2 block font-medium">
              Capacity
            </label>

            <input
              type="number"
              name="capacity"
              value={bus.capacity}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3"
            />
          </div> */}

          <div className="md:col-span-2">
             <div>
            <label className="block mb-2 font-medium text-gray-700">
              Company ID
            </label>

            <input
              type="text"
              value={bus.school_id}
              readOnly
              className="w-full rounded-xl border border-gray-300 bg-gray-100 p-3"
            />
          </div>
          </div>

          <div className="md:col-span-2 flex justify-end gap-4 mt-6">

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
            >
              Update E-Id
            </button>

            <button
              type="button"
              onClick={() => navigate("/school/buses")}
              className="rounded-xl bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}