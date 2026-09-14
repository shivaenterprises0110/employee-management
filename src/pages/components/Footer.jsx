// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        <div>

          <h3 className="text-yellow-400 text-2xl font-bold">
            VisionTrack
          </h3>

          <p className="mt-3">
            Keeping employees safe, keeping managers informed.
          </p>

        </div>

        <div>

          <h4 className="text-yellow-300 font-semibold mb-3">
            Quick Links
          </h4>

          <ul className="space-y-2">

            <li><a href="#">Home</a></li>

            <li><a href="#about">About</a></li>

            <li><a href="#how-it-works">How It Works</a></li>

            <li><a href="#contact">Contact</a></li>

          </ul>

        </div>

        <div>

          <h4 className="text-yellow-300 font-semibold mb-3">
            Connect With Us
          </h4>

          <div className="flex gap-4">

            <img
              src="https://img.icons8.com/ios-filled/30/ffffff/facebook.png"
              alt=""
            />

            <img
              src="https://img.icons8.com/ios-filled/30/ffffff/instagram.png"
              alt=""
            />

            <img
              src="https://img.icons8.com/ios-filled/30/ffffff/linkedin.png"
              alt=""
            />

          </div>

        </div>

      </div>

      <div className="text-center mt-8 text-sm">

        © 2026 VisionTrack. All rights reserved.

      </div>

    </footer>
  );
}