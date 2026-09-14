import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";
export default function AddBus() {
  const navigate = useNavigate();
  // const [schools, setSchools] = useState([]);
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

  const handleChange = (e) => {
    setBus({
      ...bus,
      [e.target.name]: e.target.value,
    });
  };
  // useEffect(() => {
  //   loadSchools();
  // }, []);

  // const loadSchools = async () => {
  //   try {
  //     const res = await axios.get(`${API_URL}/schools`);

  //     setSchools(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/buses`, bus);

      console.log(res.data);

      alert("Bus Added Successfully");

      navigate("/school/dashboard");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
        "Failed to add bus"
      );
    }
  };
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Add E-ID</h1>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Bus Information */}

          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-blue-600 border-b pb-2">
              ID Information
            </h2>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Employee ID
            </label>

            <input
              type="text"
              name="bus_number"
              value={bus.bus_number}
              onChange={handleChange}
              placeholder="EMP-001"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Employee Name
            </label>

            <input
              type="text"
              name="bus_name"
              value={bus.bus_name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* <div>
            <label className="block mb-2 font-medium text-gray-700">
              Vehicle Registration Number
            </label>

            <input
              type="text"
              name="vehicle_registration_number"
              value={bus.vehicle_registration_number}
              onChange={handleChange}
              placeholder="KA32AB1234"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div> */}

          {/* <div>
            <label className="block mb-2 font-medium text-gray-700">
              Vehicle Model
            </label>

            <input
              type="text"
              name="vehicle_model"
              value={bus.vehicle_model}
              onChange={handleChange}
              placeholder="Ashok Leyland"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div> */}

          {/* <div>
            <label className="block mb-2 font-medium text-gray-700">
              Bus Capacity
            </label>

            <input
              type="number"
              name="capacity"
              value={bus.capacity}
              onChange={handleChange}
              placeholder="50"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div> */}

          {/* Route Information 

          <div className="md:col-span-2 mt-2">
            <h2 className="text-xl font-semibold text-green-600 border-b pb-2">
              Route Information
            </h2>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Route Number
            </label>

            <input
              type="text"
              name="route_number"
              value={bus.route_number}
              onChange={handleChange}
              placeholder="R-101"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Route Name
            </label>

            <input
              type="text"
              name="route_name"
              value={bus.route_name}
              onChange={handleChange}
              placeholder="City Center Route"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>*/}

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

          <div>
            {/* <label className="block mb-2 font-medium text-gray-700">
              Assigned Driver
            </label> */}

            {/* <select
              name="driver_id"
              value={bus.driver_id}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Select Driver</option>

              <option value="e024e554-d96b-4dc6-a253-94635dac92c9">
                Ramesh Kumar
              </option>
            </select> */}
          </div>

          <div className="md:col-span-2 mt-4 gap-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg"
            >
              Save Bus
            </button>
            
            <button 
            type="button"
            onClick={() => navigate("/school/dashboard")}
              className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg"
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}