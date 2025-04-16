import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaBook } from "react-icons/fa";
import NavBar from "../components/NavBar";
import { User } from "../types";

type Props = {
  user: User;
};

type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

const Chatbot = ({ user }: Props) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Hi! I'm your SARASWATI AI assistant. Ask me anything about the research papers you've read.", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hardcoded recent papers
  const recentPapers = [
    {
      title: "Advances in Neural Machine Translation",
      authors: "Alice Johnson, Bob Smith",
      date: "2025-04-01",
    },
    {
      title: "Reinforcement Learning in Robotics",
      authors: "Carol White",
      date: "2025-03-28",
    },
    {
      title: "Deep Learning for Medical Imaging",
      authors: "Isabella Chen, Jack Wong",
      date: "2025-02-28",
    },
  ];

  // Expanded Q&A responses
  const qaResponses: { [key: string]: string } = {
    // Advances in Neural Machine Translation
    "summarize advances in neural machine translation": 
      "The paper 'Advances in Neural Machine Translation' explores transformer-based models with multi-head self-attention to enhance translation accuracy. It discusses fine-tuning on bilingual datasets, achieving a 10% BLEU score improvement over previous models.",
    "explain advances in neural machine translation": 
      "This paper introduces advancements in neural machine translation using transformer architectures. It emphasizes attention mechanisms that allow the model to focus on relevant parts of the input, improving translation fluency and coherence across languages.",
    "what is the methodology in advances in neural machine translation": 
      "The methodology involves a transformer-based architecture with multi-head self-attention, trained on large bilingual datasets. It uses techniques like layer normalization and residual connections, with fine-tuning for specific language pairs.",
    "what are the findings of advances in neural machine translation": 
      "The findings show a 10% improvement in BLEU scores compared to earlier models, with better handling of long-range dependencies and improved translation quality for low-resource languages.",
    "what are the applications of advances in neural machine translation": 
      "Applications include real-time translation apps, automated subtitle generation, and cross-lingual information retrieval, benefiting global communication and accessibility.",
    "what are the limitations of advances in neural machine translation": 
      "Limitations include high computational costs, dependency on large datasets, and challenges with rare languages or dialects where data is scarce.",
    "who cited advances in neural machine translation": 
      "The paper is cited by 'Neural Models for Low-Resource Languages' (2025) and 'Real-Time Translation Systems' (2024) for its contributions to transformer architectures.",
    "what is the future work in advances in neural machine translation": 
      "Future work includes reducing computational requirements, improving translations for low-resource languages, and integrating multimodal inputs like images or audio.",
    "explain attention mechanism in neural machine translation": 
      "The attention mechanism in the paper allows the model to weigh the importance of different input words when generating translations, improving context awareness and translation accuracy.",

    // Reinforcement Learning in Robotics
    "summarize reinforcement learning in robotics": 
      "The paper 'Reinforcement Learning in Robotics' discusses using RL to train robots for tasks like navigation and manipulation. It highlights deep Q-learning and policy gradient methods, achieving robust performance in dynamic environments.",
    "explain reinforcement learning in robotics": 
      "This paper explores how reinforcement learning enables robots to learn tasks through trial and error. It uses reward-based algorithms to optimize actions, making robots adaptable to complex, real-world settings.",
    "what is the methodology in reinforcement learning in robotics": 
      "The methodology employs deep reinforcement learning, combining Q-learning with neural networks and policy gradients, trained in simulated environments before real-world deployment.",
    "what are the findings of reinforcement learning in robotics": 
      "Findings include a 20% increase in task success rates for robotic navigation and manipulation, with RL outperforming traditional control methods in dynamic settings.",
    "what are the applications of reinforcement learning in robotics": 
      "Applications include autonomous drones, warehouse robots, and robotic arms for manufacturing, improving efficiency and adaptability.",
    "what are the limitations of reinforcement learning in robotics": 
      "Limitations include long training times, sensitivity to reward function design, and challenges in transferring simulated training to real-world scenarios.",
    "who cited reinforcement learning in robotics": 
      "Cited by 'Autonomous Navigation with RL' (2025) and 'RL for Industrial Automation' (2024), it’s influential in robotic control studies.",
    "what is the future work in reinforcement learning in robotics": 
      "Future work focuses on faster training, better sim-to-real transfer, and integrating RL with other AI techniques like vision or planning.",
    "explain policy gradients in reinforcement learning": 
      "Policy gradients optimize the robot’s actions by adjusting the policy directly based on rewards, allowing for more flexible learning in complex tasks.",

    // Deep Learning for Medical Imaging
    "summarize deep learning for medical imaging": 
      "The paper 'Deep Learning for Medical Imaging' examines convolutional neural networks (CNNs) for analyzing X-rays and MRIs, improving diagnostic accuracy by 15% through transfer learning and data augmentation.",
    "explain deep learning for medical imaging": 
      "This paper discusses how deep learning, particularly CNNs, enhances medical image analysis. It leverages large datasets and transfer learning to detect abnormalities with high precision, aiding radiologists.",
    "what is the methodology in deep learning for medical imaging": 
      "The methodology uses CNNs with transfer learning, pre-trained on ImageNet, and fine-tuned on medical datasets. Data augmentation and regularization prevent overfitting.",
    "what are the findings of deep learning for medical imaging": 
      "Findings show a 15% improvement in diagnostic accuracy for X-ray analysis, with transfer learning enabling robust performance on small medical datasets.",
    "what are the applications of deep learning for medical imaging": 
      "Applications include automated diagnosis of diseases like pneumonia, cancer detection in MRIs, and real-time imaging support in surgeries.",
    "what are the limitations of deep learning for medical imaging": 
      "Limitations include the need for large annotated datasets, risk of overfitting, and challenges in interpreting model decisions (black-box issue).",
    "who cited deep learning for medical imaging": 
      "Cited by 'AI in Radiology' (2025) and 'Automated Diagnosis Systems' (2024) for its advancements in medical imaging accuracy.",
    "what is the future work in deep learning for medical imaging": 
      "Future work includes improving model interpretability, reducing dataset requirements, and integrating with electronic health records for holistic diagnostics.",
    "explain transfer learning in medical imaging": 
      "Transfer learning involves using a pre-trained CNN (e.g., on ImageNet) and fine-tuning it on medical images, allowing high accuracy with limited medical data.",

    // General or catch-all
    "general question": 
      "Could you clarify your question or specify a paper? I can help with summaries, methodologies, findings, citations, applications, or concepts from your recent reads!",
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: messages.length, text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const normalizedInput = input.toLowerCase().trim().replace(/[^a-z0-9\s]/g, ""); // Normalize input
      const responseText = Object.keys(qaResponses).find((key) => 
        normalizedInput.includes(key.replace(/[^a-z0-9\s]/g, ""))
      ) ? qaResponses[Object.keys(qaResponses).find((key) => 
          normalizedInput.includes(key.replace(/[^a-z0-9\s]/g, ""))
        )!] : qaResponses["general question"];
      const botMessage: Message = { id: messages.length + 1, text: responseText, isUser: false };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
          SARASWATI AI <span className="text-[#852FFF]">Chatbot</span>
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-300"
        >
          Ask doubts about your research papers and get instant insights.
        </motion.p>
      </motion.section>

      {/* Main Content */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-8"
      >
        {/* Chat Interface */}
        <div className="flex-1 bg-[#3a1b6b] p-6 rounded-xl shadow-lg">
          <div className="h-[400px] overflow-y-auto mb-4 pr-4 no-scrollbar">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ x: msg.isUser ? 50 : -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`flex ${msg.isUser ? "justify-end" : "justify-start"} mb-4`}
              >
                <div
                  className={`max-w-[70%] p-4 rounded-lg ${
                    msg.isUser ? "bg-[#852FFF] text-white" : "bg-[#270C4A] text-gray-300"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about a paper..."
              className="flex-1 bg-[#270C4A] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#852FFF]"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className="bg-[#693b93] text-white p-3 rounded-lg"
            >
              <FaPaperPlane />
            </motion.button>
          </div>
        </div>

        {/* Recent Papers */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/3"
        >
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold text-[#852FFF] mb-4"
          >
            Recent Papers
          </motion.h2>
          <div className="space-y-4">
            {recentPapers.map((paper, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#3a1b6b] p-4 rounded-xl shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold">{paper.title}</h3>
                <p className="text-gray-300 text-sm">by {paper.authors}</p>
                <p className="text-gray-400 text-sm">{paper.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
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

export default Chatbot;