import { useState } from "react";
import { motion } from "framer-motion";
import { Bar, Line } from "react-chartjs-2";
import { FaUpload } from "react-icons/fa";
import NavBar from "../components/NavBar";
import { User } from "../types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  user: User;
};

const Profile = ({ user }: Props) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Hardcoded onboarding data
  const onboardingData = {
    experience: "PhD Candidate, 3 years in AI Research",
    education: "MSc in Computer Science, Stanford University",
    preferences: ["Machine Learning", "Natural Language Processing", "Data Science"],
  };

  // Hardcoded viewed papers
  const viewedPapers = [
    { title: "Deep Learning for NLP", author: "John Doe", date: "2025-03-15" },
    { title: "AI in Healthcare", author: "Jane Smith", date: "2025-03-10" },
    { title: "Quantum Computing Advances", author: "Alice Brown", date: "2025-03-05" },
  ];

  // Hardcoded chart data
  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Your Searches",
        data: [50, 60, 80, 70],
        backgroundColor: "#852FFF",
      },
      {
        label: "Others' Searches",
        data: [40, 50, 60, 55],
        backgroundColor: "#693b93",
      },
    ],
  };

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Your Activity Score",
        data: [20, 30, 50, 45],
        borderColor: "#852FFF",
        fill: false,
      },
      {
        label: "Others' Activity Score",
        data: [15, 25, 35, 30],
        borderColor: "#693b93",
        fill: false,
      },
    ],
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#2c1250] text-white">
      <NavBar />

      {/* Header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center"
      >
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          Welcome, <span className="text-[#852FFF]">{user.username}</span>!
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-300"
        >
          Your Research Dashboard
        </motion.p>
      </motion.section>

      {/* Profile Card */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-[#3a1b6b] p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-8"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <img
              src={profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-[#852FFF] object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-[#693b93] p-2 rounded-full cursor-pointer">
              <FaUpload className="text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-2">{user.username}</h2>
            <p className="text-gray-300 mb-4">{user.email}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[#852FFF]">Experience</h3>
                <p className="text-gray-300">{onboardingData.experience}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#852FFF]">Education</h3>
                <p className="text-gray-300">{onboardingData.education}</p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-[#852FFF]">Preferences</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {onboardingData.preferences.map((pref, index) => (
                  <span
                    key={index}
                    className="bg-[#693b93] text-white px-3 py-1 rounded-full text-sm"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Charts Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Your Research Stats
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#3a1b6b] p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Paper Searches</h3>
            <Bar data={barChartData} options={{ responsive: true }} />
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-[#3a1b6b] p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Activity Score</h3>
            <Line data={lineChartData} options={{ responsive: true }} />
          </motion.div>
        </div>
      </motion.section>

      {/* Viewed Papers Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Recently Viewed Papers
        </motion.h2>
        <div className="space-y-4">
          {viewedPapers.map((paper, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#3a1b6b] p-6 rounded-xl shadow-lg flex justify-between items-center"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <h3 className="text-lg font-semibold">{paper.title}</h3>
                <p className="text-gray-300">{paper.author}</p>
              </div>
              <p className="text-gray-300">{paper.date}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#270C4A] py-8 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-lg mb-4">SARASWATI AI - Empowering Research with Intelligence</p>
          <div className="flex justify-center gap-6">
            <a href="/about" className="text-gray-300 hover:text-[#852FFF] transition-colors">About</a>
            <a href="/contact" className="text-gray-300 hover:text-[#852FFF] transition-colors">Contact</a>
            <a href="/privacy" className="text-gray-300 hover:text-[#852FFF] transition-colors">Privacy Policy</a>
          </div>
          <p className="text-gray-500 mt-4">© 2025 SARASWATI AI. All rights reserved.</p>
        </motion.div>
      </footer>
    </div>
  );
};

export default Profile;