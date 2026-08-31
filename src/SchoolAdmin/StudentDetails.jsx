import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const loggedSchool = JSON.parse(localStorage.getItem("de_authUser"));

  const [busName, setBusName] = useState("");

  const [student, setStudent] = useState(null);

  const [schoolName, setSchoolName] = useState("");

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await axios.get(`${API_URL}/students/${id}`);

      // Security check
      if (res.data.student.school_id !== loggedSchool.school_id) {
        alert("Unauthorized access");
        navigate("/school/students");
        return;
      }

      setStudent(res.data.student);

      // Fetch bus number
      const busRes = await axios.get(
        `${API_URL}/buses/${res.data.student.bus_id}`
      );

      if (busRes.data.success) {
        setBusName(busRes.data.bus.bus_number);
      }

      // Fetch school name
      const schoolRes = await axios.get(`${API_URL}/schools`);
      const school = schoolRes.data.find(
        (s) => s.id === loggedSchool.school_id
      );

      setSchoolName(school?.school_name || "Unknown School");

    } catch (err) {
      console.error(err);
      alert("Failed to load student details");
    }
  };

  if (!student) {
    return (
      <div className="p-8 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-6">
        Student Details
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <label className="font-semibold">Student Name</label>
          <p>{student.student_name}</p>
        </div>

        <div>
          <label className="font-semibold">Student ID</label>
          <p>{student.id}</p>
        </div>

        <div>
          <label className="font-semibold">Parent Name</label>
          <p>{student.parent_name}</p>
        </div>
        <div>
          <label className="font-semibold">Parent Email</label>
          <p>{student.parent_email}</p>
        </div>
        <div>
          <label className="font-semibold">Phone</label>
          <p>{student.parent_phone}</p>
        </div>

        <div>
          <label className="font-semibold">School</label>
          <p>{schoolName}</p>
        </div>

        <div>
          <label className="font-semibold">Bus Number</label>
          <p>{busName}</p>
        </div>

        <div>
          <label className="font-semibold">Pickup Point</label>
          <p>{student.pickup_point}</p>
        </div>

        {/* <div>
          <label className="font-semibold">Drop Point</label>
          <p>{student.drop_point}</p>
        </div> */}

      </div>

      <button
        onClick={() => navigate("/school/students")}
        className="mt-8 bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        Back
      </button>
    </div>
  );
}