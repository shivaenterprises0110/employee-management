// src/components/Hero.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const images = [
    "https://cdn.phototourl.com/free/2026-07-09-62031c6a-0759-4620-891d-33cb2ce22f5d.jpg",

    "https://cdn.phototourl.com/free/2026-07-09-48440a33-c7af-4ff4-b0d2-54fc6e2400c0.jpg",

    "https://cdn.phototourl.com/free/2026-07-08-37cf1f8d-91c3-4570-927c-4ee35081965b.jpg",
];

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-screen overflow-hidden">

            {/* Background Images */}

            {images.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${current === index ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        backgroundImage: `url(${img})`,
                    }}
                />
            ))}

            {/* Dark Overlay */}

            <div className="absolute inset-0 bg-black/50"></div>

            {/* Hero Content */}

            <div className="relative z-10 flex h-screen flex-col items-center justify-center pt-24 px-6 text-center animate-fadeIn">

                <h1 className="mb-6 text-5xl font-extrabold leading-tight text-yellow-400 drop-shadow-lg md:text-6xl ">
                    Trusted Technology for Smarter 
                    <br />
                    Employee Management.
                </h1>

                <p className="mb-8 max-w-2xl text-lg text-gray-200 md:text-xl">
                    From employee records to performance analytics, manage every aspect of your workforce on one reliable, future-ready platform.
                    <br />
                    <br />
                    <span className="italic">
                        “Empowering every employee to work smarter, stay connected, and grow every day.”
                    </span>
                </p>

                <a >
                    <button
                        onClick={() => {
                            const user = localStorage.getItem("de_authUser");

                            if (!user) {
                                alert("Please login first to access the School Dashboard.");
                                navigate("/login");   // change this route if your login page is different
                                return;
                            }

                            navigate("/school/dashboard");
                        }}
                        className="rounded-lg bg-green-500 px-8 py-3 text-lg font-semibold text-white transition hover:bg-green-600 hover:scale-105"
                    >
                        Get Started
                    </button>
                </a>

            </div>

            {/* Fade Animation */}

            <style>{`
        @keyframes fadeIn {
          from {
            opacity:0;
            transform:translateY(20px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        .animate-fadeIn{
          animation:fadeIn 1s ease-in-out;
        }
      `}</style>

        </section>
    );
}