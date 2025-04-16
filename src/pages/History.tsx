import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import { User } from "../types";

type Props = {
  user: User;
};

const History = ({ user }: Props) => {
  // Hardcoded user's viewed papers
  const userPapers = [
    {
      title: "Advances in Neural Machine Translation",
      authors: "Alice Johnson, Bob Smith",
      date: "2025-04-01",
      description: "Explores novel architectures for improving translation accuracy in NLP.",
    },
    {
      title: "Reinforcement Learning in Robotics",
      authors: "Carol White",
      date: "2025-03-28",
      description: "Discusses RL applications for autonomous robotic systems.",
    },
    {
      title: "Big Data Analytics with Spark",
      authors: "David Lee, Emma Brown",
      date: "2025-03-20",
      description: "A comprehensive guide to scalable data processing using Apache Spark.",
    },
    {
      title: "Quantum Machine Learning Models",
      authors: "Frank Green",
      date: "2025-03-15",
      description: "Investigates the intersection of quantum computing and ML.",
    },
    {
      title: "Ethics in AI Development",
      authors: "Grace Kim",
      date: "2025-03-10",
      description: "Examines ethical considerations in building AI systems.",
    },
    {
      title: "Graph Neural Networks for Social Analysis",
      authors: "Henry Patel",
      date: "2025-03-05",
      description: "Applies GNNs to model complex social interactions.",
    },
    {
      title: "Deep Learning for Medical Imaging",
      authors: "Isabella Chen, Jack Wong",
      date: "2025-02-28",
      description: "Reviews DL techniques for diagnostic imaging.",
    },
    {
      title: "Federated Learning Challenges",
      authors: "Kelly Adams",
      date: "2025-02-20",
      description: "Addresses privacy and scalability in federated learning systems.",
    },
    {
      title: "Natural Language Generation Trends",
      authors: "Liam Evans",
      date: "2025-02-15",
      description: "Surveys recent advancements in NLG technologies.",
    },
    {
      title: "AI-Driven Financial Forecasting",
      authors: "Mia Turner",
      date: "2025-02-10",
      description: "Explores AI models for predicting market trends.",
    },
  ];

  // Hardcoded papers others are reading
  const othersPapers = [
    {
      title: "Transformers in Vision Tasks",
      authors: "Noah Clark",
      date: "2025-04-10",
      description: "Adapts transformer models for image recognition tasks.",
    },
    {
      title: "Blockchain for Data Security",
      authors: "Olivia Harris, Peter Young",
      date: "2025-04-08",
      description: "Explores blockchain’s role in securing research data.",
    },
    {
      title: "Explainable AI Frameworks",
      authors: "Quinn Lee",
      date: "2025-04-05",
      description: "Proposes methods for interpretable AI decisions.",
    },
    {
      title: "Time Series Analysis with LSTMs",
      authors: "Rachel Kim",
      date: "2025-04-03",
      description: "Uses LSTMs for predictive analytics in temporal data.",
    },
    {
      title: "Human-Robot Collaboration",
      authors: "Samuel Wright",
      date: "2025-04-01",
      description: "Studies effective collaboration between humans and robots.",
    },
    {
      title: "Generative Adversarial Networks",
      authors: "Tara Brown",
      date: "2025-03-30",
      description: "Reviews GAN applications in synthetic data generation.",
    },
    {
      title: "AI for Climate Modeling",
      authors: "Uma Patel",
      date: "2025-03-25",
      description: "Leverages AI to improve climate prediction accuracy.",
    },
    {
      title: "Speech Recognition Advances",
      authors: "Victor Liu",
      date: "2025-03-20",
      description: "Discusses improvements in ASR systems.",
    },
    {
      title: "Edge Computing for IoT",
      authors: "Wendy Chen",
      date: "2025-03-15",
      description: "Explores edge computing for real-time IoT applications.",
    },
    {
      title: "Bias Mitigation in ML",
      authors: "Xander Gray",
      date: "2025-03-10",
      description: "Strategies to reduce bias in machine learning models.",
    },
    {
      title: "Augmented Reality Interfaces",
      authors: "Yara Singh",
      date: "2025-03-05",
      description: "Designs AR interfaces for research visualization.",
    },
    {
      title: "Swarm Intelligence Algorithms",
      authors: "Zoe Miller",
      date: "2025-03-01",
      description: "Applies swarm techniques to optimization problems.",
    },
    {
      title: "Cross-Lingual Information Retrieval",
      authors: "Adam Foster",
      date: "2025-02-25",
      description: "Improves search across multiple languages.",
    },
    {
      title: "Sentiment Analysis Techniques",
      authors: "Bella Hayes",
      date: "2025-02-20",
      description: "Compares modern approaches to sentiment analysis.",
    },
    {
      title: "AI in Drug Discovery",
      authors: "Charlie Kim",
      date: "2025-02-15",
      description: "Uses AI to accelerate pharmaceutical research.",
    },
  ];

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
          Your Research History
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-300"
        >
          Track the papers you’ve explored with SARASWATI AI
        </motion.p>
      </motion.section>

      {/* User's Viewed Papers */}
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
          className="text-3xl font-bold mb-8"
        >
          Your Viewed Papers
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userPapers.map((paper, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#3a1b6b] p-6 rounded-xl shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
              <p className="text-gray-300 mb-2">by {paper.authors}</p>
              <p className="text-gray-400 text-sm mb-3">{paper.date}</p>
              <p className="text-gray-300">{paper.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Others' Reading */}
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
          className="text-3xl font-bold mb-8"
        >
          What Others Are Reading
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {othersPapers.map((paper, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#3a1b6b] p-6 rounded-xl shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
              <p className="text-gray-300 mb-2">by {paper.authors}</p>
              <p className="text-gray-400 text-sm mb-3">{paper.date}</p>
              <p className="text-gray-300">{paper.description}</p>
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

export default History;