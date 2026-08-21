import { useEffect, useMemo, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";

export default function StudentList() {
  const navigate = useNavigate();
  const loggedSchool = JSON.parse(localStorage.getItem("de_authUser"));
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [busMap, setBusMap] = useState({});
  const [schoolName, setSchoolName] = useState("");
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const school = JSON.parse(localStorage.getItem("de_authUser"));

      // Students
      const studentRes = await axios.get(
        `${API_URL}/students/school/${school.school_id}`
      );
      setStudents(studentRes.data.students || []);

      // Buses
      const busRes = await axios.get(
        `${API_URL}/buses/school/${school.school_id}`
      );

      const map = {};
      (busRes.data.buses || []).forEach((bus) => {
        map[bus.id] = bus.bus_number;
      });
      setBusMap(map);

      // School name
      const schoolRes = await axios.get(`${API_URL}/schools`);
      const currentSchool = schoolRes.data.find(
        (s) => s.id === school.school_id
      );

      setSchoolName(currentSchool?.school_name || "Unknown School");

    } catch (err) {
      console.error(err);
      alert("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/students/${id}`);

      alert("Student deleted successfully");

      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Failed to delete student");
    }
  };

  const filteredStudents = useMemo(() => {
    const q = search.toLowerCase();

    return students.filter(
      (s) =>
        (s.student_name || "").toLowerCase().includes(q) ||
        (s.parent_name || "").toLowerCase().includes(q) ||
        (s.parent_phone || "").toLowerCase().includes(q) ||
        String(s.id).includes(q)
    );
  }, [students, search]);

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-gray-500">
            Manage all registered students
          </p>
        </div>

        <div className="rounded-xl bg-blue-600 px-5 py-3 text-white">
          Total Students : {filteredStudents.length}
        </div>
      </div>

      <div className="mb-6 rounded-xl border bg-white p-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-4 text-gray-400" />

          <input
            className="w-full border rounded-xl py-3 pl-10 pr-3"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center">
          Loading students...
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="p-8 text-center">
          No students found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="min-w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-center">Student</th>
                {/* <th className="p-3">ID</th> */}
                <th className="p-3 text-center">Parent</th>
                <th className="p-3 text-center">Phone</th>
                <th className="p-3 text-center">School</th>
                <th className="p-3 text-center">Bus Number</th>
                <th className="p-3 text-center">Pickup</th>
                {/* <th className="p-3 text-center">Drop</th> */}
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="p-3 text-center">
                    {student.student_name}
                  </td>

                  {/* <td className="p-3">
                    {student.id}
                  </td> */}

                  <td className="p-3 text-center">
                    {student.parent_name}
                  </td>

                  <td className="p-3 text-center">
                    {student.parent_phone}
                  </td>

                  <td className="p-3 text-center">
                    {schoolName}
                  </td>

                  <td className="p-3 text-center">
                    {busMap[student.bus_id] || "N/A"}
                  </td>

                  <td className="p-3 text-center">
                    {student.pickup_point}
                  </td>

                  {/* <td className="p-3 text-center">
                    {student.drop_point}
                  </td> */}

                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-3">

                      {/* View */}
                      <button
                        onClick={() =>
                          navigate(
                            `/school/students/view/${student.id}`
                          )
                        }
                        className="text-blue-600 hover:text-blue-800"
                        title="View Student"
                      >
                        <FaEye />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() =>
                          navigate(
                            `/school/students/edit/${student.id}`
                          )
                        }
                        className="text-green-600 hover:text-green-800"
                        title="Edit Student"
                      >
                        <FaEdit />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Student"
                      >
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