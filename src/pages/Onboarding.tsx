import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from "../assets/background.png";
import { User } from '../types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface OnboardingProps {
  user: User;
  onComplete: () => void;
}

// Expanded preferences tree with more topics
const preferencesTree = {
  "AI & Machine Learning": {
    "Machine Learning": {
      "Supervised Learning": ["Linear Regression", "Decision Trees", "Neural Networks"],
      "Unsupervised Learning": ["Clustering", "Dimensionality Reduction", "Anomaly Detection"],
      "Reinforcement Learning": ["Q-Learning", "Policy Gradients", "Multi-Agent Systems"]
    },
    "Natural Language Processing": {
      "Text Analysis": ["Sentiment Analysis", "Named Entity Recognition", "Topic Modeling"],
      "Translation": ["Neural Machine Translation", "Statistical Methods"],
      "Question Answering": ["Extractive QA", "Generative QA"]
    },
    "Computer Vision": {
      "Image Recognition": ["Classification", "Object Detection"],
      "Video Analysis": ["Action Recognition", "Tracking"],
      "3D Vision": ["Depth Estimation", "Point Clouds"]
    }
  },
  "Robotics & Control": {
    "Perception": ["Sensors", "Sensor Fusion", "SLAM"],
    "Control Systems": ["PID Control", "Adaptive Control", "Optimal Control"],
    "Path Planning": ["A* Algorithm", "RRT", "Dynamic Planning"],
    "Manipulation": ["Grasping", "Dexterous Manipulation"]
  },
  "Software Development": {
    "Web Development": {
      "Frontend": ["React", "Vue", "Angular"],
      "Backend": ["Node.js", "Django", "Ruby on Rails"]
    },
    "Mobile Development": ["iOS", "Android", "Flutter"],
    "DevOps": ["CI/CD", "Containerization", "Infrastructure as Code"]
  },
  "Quantum Computing": {
    "Algorithms": ["Shor's Algorithm", "Grover's Algorithm", "VQE"],
    "Hardware": ["Superconducting Qubits", "Ion Traps", "Photonics"],
    "Applications": ["Cryptography", "Optimization", "Simulation"]
  },
  "Data Science": {
    "Statistics": ["Hypothesis Testing", "Bayesian Methods"],
    "Big Data": ["Hadoop", "Spark", "Distributed Computing"],
    "Visualization": ["Dashboards", "Interactive Visualizations"]
  }
};

// Education levels
const educationLevels = [
  "High School",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD or Doctorate",
  "Self-taught"
];

// Experience levels
const experienceLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert"
];

const Onboarding = ({ user, onComplete }: OnboardingProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
  const [activeStep, setActiveStep] = useState(0);
  const [education, setEducation] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  
  const steps = [
    { title: "Welcome", description: "Let's get you set up with your account" },
    { title: "Experience", description: "Tell us about your experience level" },
    { title: "Education", description: "Share your educational background" },
    { title: "Preferences", description: "Select your areas of interest" },
    { title: "Summary", description: "Review your selections" }
  ];

  const toggleExpand = (key: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleSelection = (value: string) => {
    setSelectedPreferences(prev =>
      prev.includes(value) ? prev.filter(p => p !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/complete-onboarding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          preferences: selectedPreferences,
          education,
          experience
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Onboarding error:', errorData);
        throw new Error('Failed to complete onboarding');
      }

      onComplete();
      navigate('/home');
    } catch (error) {
      console.error('Onboarding error:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  type TreeNode = {
    label: string;
    value: any;
    path: string;
    level: number;
    isObject: boolean;
    parentPath: string;
    isExpanded: boolean;
    isSelected: boolean;
  };

  // This function builds all nodes with their states 
  const buildTreeNodes = (tree: any, level = 0, parentPath = ''): TreeNode[] => {
    let nodes: TreeNode[] = [];
    
    Object.entries(tree).forEach(([key, value]) => {
      const path = parentPath ? `${parentPath} > ${key}` : key;
      const isObject = typeof value === 'object';
      const isExpanded = !!expandedNodes[path];
      const isSelected = selectedPreferences.includes(path);
      
      nodes.push({
        label: key,
        value,
        path,
        level,
        isObject,
        parentPath,
        isExpanded,
        isSelected
      });
      
      // If node is expanded and has children, add them too
      if (isObject && isExpanded) {
        nodes = nodes.concat(buildTreeNodes(value, level + 1, path));
      }
    });
    
    return nodes;
  };

  // Render a preference tree as a horizontal expanding tree
  const renderHorizontalTree = () => {
    const allNodes = buildTreeNodes(preferencesTree);
    const levelMap: Record<number, TreeNode[]> = {};
    
    // Group nodes by level
    allNodes.forEach(node => {
      if (!levelMap[node.level]) levelMap[node.level] = [];
      levelMap[node.level].push(node);
    });
    
    // Maximum rendered level
    const maxLevel = Math.max(...Object.keys(levelMap).map(k => parseInt(k)));
    
    // Render each level row
    return (
      <div className="w-full overflow-x-auto overflow-y-hidden">
        <div className="inline-flex flex-col space-y-6 min-w-full pb-4">
          {Array.from({length: maxLevel + 1}).map((_, level) => {
            if (!levelMap[level]) return null;
            
            return (
              <div key={`level-${level}`} className="flex flex-wrap gap-2">
                {levelMap[level].map(node => (
                  <div key={node.path} className="flex-shrink-0 relative">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                        node.isObject
                          ? node.isExpanded ? 'bg-[#693b93] text-white' : 'bg-gray-700 text-gray-200'
                          : node.isSelected
                            ? 'bg-[#693b93] text-white'
                            : 'bg-gray-700 text-gray-200'
                      } hover:shadow-lg`}
                      onClick={() => node.isObject ? toggleExpand(node.path) : toggleSelection(node.path)}
                    >
                      {node.isSelected && !node.isObject && (
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      )}
                      {node.label}
                      {node.isObject && (
                        <span className="ml-2 text-xs">
                          {node.isExpanded ? '▼' : '▶'}
                        </span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const isStepComplete = () => {
    switch (activeStep) {
      case 0: return true; // Welcome screen is always complete
      case 1: return !!experience; // Experience level
      case 2: return !!education; // Education
      case 3: return selectedPreferences.length > 0; // Preferences
      case 4: return true; // Summary is always complete
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Welcome, {user.username}!</h1>
            <p className="text-lg mb-8">We're excited to have you join us. Let's set up your profile to personalize your experience.</p>
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-purple-300 flex items-center justify-center">
              <span className="text-3xl">{user.username.charAt(0).toUpperCase()}</span>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">What's your experience level?</h2>
            <p className="mb-6 text-gray-300">This helps us tailor content to your knowledge level.</p>
            <div className="grid grid-cols-2 gap-4">
              {experienceLevels.map(level => (
                <button
                  key={level}
                  type="button"
                  className={`p-6 rounded-xl transition-all ${
                    experience === level 
                      ? 'bg-[#693b93] text-white shadow-lg transform scale-105' 
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  }`}
                  onClick={() => setExperience(level)}
                >
                  <div className="flex items-center mb-2">
                    {experience === level && (
                      <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                    )}
                    <span className="text-lg font-semibold">{level}</span>
                  </div>
                  <p className="text-sm opacity-80">
                    {level === "Beginner" && "Just starting out, learning the basics"}
                    {level === "Intermediate" && "Comfortable with fundamentals, building knowledge"}
                    {level === "Advanced" && "Deep understanding, working on complex problems"}
                    {level === "Expert" && "Mastery level, can teach others and innovate"}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">What's your educational background?</h2>
            <p className="mb-6 text-gray-300">This helps us understand your foundation.</p>
            <div className="grid grid-cols-2 gap-4">
              {educationLevels.map(level => (
                <button
                  key={level}
                  type="button"
                  className={`p-6 rounded-xl transition-all ${
                    education === level 
                      ? 'bg-[#693b93] text-white shadow-lg transform scale-105' 
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  }`}
                  onClick={() => setEducation(level)}
                >
                  <div className="flex items-center">
                    {education === level && (
                      <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                    )}
                    <span className="text-lg font-semibold">{level}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Select your interests</h2>
            <p className="mb-6 text-gray-300">Click on categories to expand them and select specific topics you're interested in.</p>
            <div className="p-4 bg-[#3a1a63] rounded-xl overflow-auto max-h-[300px] shadow-inner">
              {renderHorizontalTree()}
            </div>
            {selectedPreferences.length > 0 && (
              <div className="mt-4 text-right">
                <p className="text-sm text-green-300">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  {selectedPreferences.length} topics selected
                </p>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Review Your Profile</h2>
            <div className="space-y-6">
              <div className="bg-[#3a1a63] p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2 text-purple-300">Experience Level</h3>
                <p className="text-xl">{experience || "Not specified"}</p>
              </div>
              
              <div className="bg-[#3a1a63] p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2 text-purple-300">Educational Background</h3>
                <p className="text-xl">{education || "Not specified"}</p>
              </div>
              
              <div className="bg-[#3a1a63] p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2 text-purple-300">Selected Interests</h3>
                {selectedPreferences.length > 0 ? (
                  <div className="max-h-[200px] overflow-y-auto">
                    {selectedPreferences.map(pref => (
                      <div key={pref} className="mb-2 flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        <span>{pref}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-yellow-300">You haven't selected any interests yet.</p>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="relative h-full w-full flex justify-center min-h-[100vh] text-white items-center py-10"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col border-2 bg-[#2c1250] border-[#693b93] rounded-2xl w-[90%] max-w-[700px] shadow-2xl overflow-hidden">
        {/* Header with progress */}
        <div className="bg-[#411c75] p-6 pb-0">
          <div className="flex justify-between mb-6">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col items-center ${index <= activeStep ? 'text-white' : 'text-gray-400'}`}>
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
                    ${index < activeStep ? 'bg-green-500' : index === activeStep ? 'bg-[#9c5cf5] ring-4 ring-[#693b93] ring-opacity-50' : 'bg-gray-700'}`}
                >
                  {index < activeStep ? '✓' : index + 1}
                </div>
                <span className="text-xs mt-2 hidden md:block">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full mb-0">
            <div 
              className="bg-[#9c5cf5] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content area */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="w-full">
            {renderStepContent()}

            <div className="flex justify-between mt-10">
              <button
                type="button"
                onClick={prevStep}
                className={`py-3 px-6 rounded-lg transition-colors
                  ${activeStep === 0 ? 'invisible' : 'bg-gray-700 hover:bg-gray-600 text-white font-medium'}`}
              >
                Back
              </button>
              
              {activeStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepComplete()}
                  className="bg-[#9c5cf5] hover:bg-[#ad7af6] text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:hover:bg-[#9c5cf5]"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || selectedPreferences.length === 0 || !experience || !education}
                  className="bg-[#9c5cf5] hover:bg-[#ad7af6] text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:hover:bg-[#9c5cf5]"
                >
                  {loading ? 'Completing...' : 'Complete Setup'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

