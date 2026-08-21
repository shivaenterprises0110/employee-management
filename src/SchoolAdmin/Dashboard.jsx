import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";
import {
  FaUserGraduate,
  FaBus,
  FaIdCard,
} from "react-icons/fa";

export default function Dashboard() {
  const school = JSON.parse(localStorage.getItem("de_authUser"));
  const [schoolName, setSchoolName] = useState("");
  const [stats, setStats] = useState({
    students: 0,
    drivers: 0,
    buses: 0,
  });

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
        ? "Good Afternoon"
        : "Good Evening";

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const schoolId = school.school_id;

      const [studentsRes, driversRes, busesRes, schoolRes] = await Promise.all([
        axios.get(`${API_URL}/students/school/${schoolId}`),
        axios.get(`${API_URL}/drivers/school/${schoolId}`),
        axios.get(`${API_URL}/buses/school/${schoolId}`),
        axios.get(`${API_URL}/schools`),
      ]);

      setStats({
        students: studentsRes.data.students.length,
        drivers: driversRes.data.length,
        buses: busesRes.data.buses.length,
      });

      const currentSchool = schoolRes.data.find(
        (s) => s.id === schoolId
      );

      setSchoolName(currentSchool?.school_name || "School");

    } catch (err) {
      console.error("Dashboard Error:", err);
    }
  };

  const cards = [
    {
      title: "Total Students",
      value: stats.students,
      icon: <FaUserGraduate className="text-4xl text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      title: "Total Drivers",
      value: stats.drivers,
      icon: <FaIdCard className="text-4xl text-green-600" />,
      bg: "bg-green-50",
    },
    {
      title: "Total Buses",
      value: stats.buses,
      icon: <FaBus className="text-4xl text-orange-500" />,
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold">
          {/* {greeting},  */}
          {schoolName} 
          {/* 👋 */}
        </h1>

        <p className="mt-3 text-lg text-blue-100">
          Welcome to your School Transport Dashboard
        </p>

        {/* <div className="mt-6 inline-block rounded-xl bg-white/20 px-4 py-2">
          <span className="text-sm text-blue-100">School ID</span>
          <p className="font-semibold">{school?.school_id}</p>
        </div> */}
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.bg} rounded-2xl p-6 shadow-lg`}
          >
            <div className="flex items-center justify-between">
              {card.icon}
              <h2 className="text-4xl font-bold">{card.value}</h2>
            </div>

            <p className="mt-4 text-lg font-semibold text-gray-700">
              {card.title}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}