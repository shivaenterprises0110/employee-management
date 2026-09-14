// src/components/HowItWorks.jsx

export default function HowItWorks() {
  const steps = [
    {
      img: "https://img.icons8.com/color/96/login-rounded-right.png",
      title: "1. Login to the System",
      desc: "Managers securely log in to access the Employee Tracker dashboard and manage transportation services.",
    },
    {
      img: "https://cviefvnvftkewddwuktu.supabase.co/storage/v1/object/sign/visiontrack/Eicon.png?token=eyJraWQiOiI5ZmNjOGQ1OC04MDVmLTQyNTYtOTgyYS00NDU3MDZhZGFhNzkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aXNpb250cmFjay9FaWNvbi5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mzk1NDYyLCJleHAiOjE4MjA5MzE0NjJ9.BmHHNFe4QdoQh6sGuR5Qf0cL_EsJ7gJB520_wJk9Dfs",
      title: "2. Manage Employee Transportation",
      desc: "Add E-ID, register employees, and organize workplace transportation efficiently.",
    },
    {
      img: "https://img.icons8.com/color/96/gps-device.png",
      title: "3. Monitor Live Employee Tracking",
      desc: "Track employees in real time, monitor routes, receive notifications, and ensure the safety of every employee throughout the journey.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-gray-900 px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
      <h2 className="mb-10 text-3xl font-bold text-yellow-400 sm:mb-12">
        How It Works
      </h2>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-2xl bg-gray-800 p-6 shadow-lg transition duration-300 hover:scale-105"
          >
            <img src={step.img} className="mx-auto mb-5 h-24 w-24" alt="" />

            <h3 className="mb-3 text-xl font-semibold text-yellow-300">
              {step.title}
            </h3>

            <p className="text-gray-300">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}