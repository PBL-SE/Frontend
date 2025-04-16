import { motion } from "framer-motion";
import { FaSearch, FaFileAlt, FaChartLine, FaUserCheck, FaLightbulb } from "react-icons/fa";
import NavBar from "../components/NavBar";
import { User } from "../types";

type Props = {
  user: User;
};

const About = ({ user }: Props) => {
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, rotate: 5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.6, delay: i * 0.15, type: "spring", stiffness: 100 },
    }),
  };

  const zoomVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const slideRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const bounceVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", bounce: 0.4 } },
  };

  return (
    <div className="relative min-h-screen bg-[#2c1250] text-white">
      <NavBar />

      {/* Header */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center"
      >
        <motion.h1
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 120 }}
          className="text-4xl sm:text-5xl font-bold mb-6"
        >
          About <span className="text-[#852FFF]">SARASWATI AI</span>
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
        >
          Your ultimate companion for exploring, summarizing, and analyzing research papers.
        </motion.p>
      </motion.section>

      {/* Introduction */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="bg-[#3a1b6b] p-8 rounded-xl shadow-lg text-center"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-semibold text-[#852FFF] mb-4">Welcome to SARASWATI AI</h2>
          <p className="text-gray-300">
            SARASWATI AI leverages cutting-edge machine learning and NLP to deliver insights from the latest research, empowering researchers, students, and academics to stay ahead in the fast-evolving world of science.
          </p>
        </motion.div>
      </motion.section>

      {/* Features */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Our Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <FaSearch className="text-[#852FFF] w-8 h-8" />,
              title: "Explore Papers",
              description: "Discover a vast collection of research papers across various disciplines.",
            },
            {
              icon: <FaFileAlt className="text-[#852FFF] w-8 h-8" />,
              title: "Summarize Insights",
              description: "Quickly generate summaries and identify key findings from abstracts.",
            },
            {
              icon: <FaChartLine className="text-[#852FFF] w-8 h-8" />,
              title: "Analyze Metrics",
              description: "Evaluate paper difficulty, citations, and other research metrics.",
            },
            {
              icon: <FaUserCheck className="text-[#852FFF] w-8 h-8" />,
              title: "Personalized Recommendations",
              description: "Get tailored paper suggestions based on your interests.",
            },
            {
              icon: <FaLightbulb className="text-[#852FFF] w-8 h-8" />,
              title: "Research Trends",
              description: "Visualize trends and author contributions in an intuitive dashboard.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              viewport={{ once: true }}
              className="bg-[#3a1b6b] p-6 rounded-xl shadow-lg text-center"
              whileHover={{ scale: 1.03, rotate: 0 }}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Mission */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={zoomVariants}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.div
          className="bg-[#3a1b6b] p-8 rounded-xl shadow-lg text-center"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-semibold text-[#852FFF] mb-4">Our Mission</h2>
          <p className="text-gray-300">
            To democratize access to advanced research tools, making discovery efficient, effective, and accessible for all.
          </p>
        </motion.div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={slideRightVariants}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.div
          className="bg-[#3a1b6b] p-8 rounded-xl shadow-lg text-center"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-semibold text-[#852FFF] mb-4">Why Choose SARASWATI AI?</h2>
          <p className="text-gray-300">
            Whether you’re a student, researcher, or academic, we streamline your research process with tools that save time, enhance productivity, and spark innovation.
          </p>
        </motion.div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={bounceVariants}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
      >
        <motion.h3
          className="text-xl font-medium text-gray-300 mb-6"
        >
          Thank you for choosing SARASWATI AI. Let’s make research discovery extraordinary!
        </motion.h3>
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px #852FFF" }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#693b93] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#7b4ca5] transition-colors"
          onClick={() => (window.location.href = "/home")}
        >
          Start Exploring
        </motion.button>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true }}
        className="bg-[#270C4A] py-8 px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
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
      </motion.footer>
    </div>
  );
};

export default About;