// src/components/About.jsx

export default function About() {
    return (
        <section
            id="about"
            className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-20"
            style={{
                backgroundImage:
                    "url(https://cdn.phototourl.com/free/2026-07-09-c64a6db9-a328-4a26-b433-881755b58b96.jpg",
            }}
        >
            <div className="absolute inset-0 bg-black/70"></div>

            <div className="relative max-w-4xl text-center">
                <h2 className="text-4xl font-bold text-yellow-400 mb-6">
                    About Us
                </h2>

                <p className="text-lg md:text-xl leading-8 text-gray-200">
                    VisionTrack is an innovative employee management platform designed to simplify workforce operations by bringing employee records, attendance, performance tracking, payroll, and analytics together in one secure and reliable platform.
                    <br /><br />

                    <span className="text-yellow-400 font-semibold">
                        Ensure employee satisfaction and productivity.
                    </span>

                    <br /><br />

                    Using smart GPS technology, we connect Employee and Management through real-time employee tracking, instant notifications, and route monitoring to ensure every employee travels safely and arrives on time.

                    <br /><br />

                    Together, we can build a future where every employee travels safely and every manager stays informed.
                </p>
            </div>
        </section>
    );
}