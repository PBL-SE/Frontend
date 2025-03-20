import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from "../assets/background.png";
import { User } from '../types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface OnboardingProps {
  user: User;
  onComplete: () => void;
}

const preferencesTree = {
  "AI": {
    "Machine Learning": ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning"],
    "NLP": ["Sentiment Analysis", "Translation", "Question Answering"],
    "Computer Vision": ["Image Recognition", "Object Detection", "Segmentation"],
  },
  "Robotics": {
    "Control Systems": ["PID Control", "Kalman Filter"],
    "Path Planning": ["A* Algorithm", "RRT"]
  },
  "Quantum Computing": {
    "Algorithms": ["Shor's Algorithm", "Grover's Algorithm"]
  }
};

const Onboarding = ({ user, onComplete }: OnboardingProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});

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
        body: JSON.stringify({ preferences: selectedPreferences })
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

  const renderTree = (data: any, parentKey = '') => {
    return Object.entries(data).map(([key, value]) => {
      const fullPath = parentKey ? `${parentKey} > ${key}` : key;

      return (
        <div key={fullPath} className="flex flex-col">
          <div className="flex items-center">
            {typeof value === 'object' ? (
              <button
                type="button"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  expandedNodes[fullPath] ? 'bg-[#693b93] text-white' : 'bg-gray-700 text-gray-300'
                }`}
                onClick={() => toggleExpand(fullPath)}
              >
                {key}
              </button>
            ) : (
              <button
                type="button"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedPreferences.includes(fullPath)
                    ? 'bg-[#693b93] text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
                onClick={() => toggleSelection(fullPath)}
              >
                {key}
              </button>
            )}
          </div>
          {expandedNodes[fullPath] && typeof value === 'object' && (
            <div className="ml-6 mt-2 space-y-2">
              {renderTree(value, fullPath)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className="relative h-full w-full flex justify-center min-h-[100vh] text-white items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col justify-center items-center border-4 bg-[#2c1250] border-[#693b93] p-8 rounded-xl w-[90%] max-w-[600px]">
        <h1 className="text-3xl font-bold mb-6">Hello, {user.username}!</h1>
        <h2 className="text-xl mb-8">Select your preferences</h2>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <div className="space-y-3">
              {renderTree(preferencesTree)}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading || selectedPreferences.length === 0}
              className="bg-[#693b93] hover:bg-[#7d4aad] text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Complete Setup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
