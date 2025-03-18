import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPreferences, setOnboarded } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import background from "../assets/background.png";
import "./Onboarding.css";

const backendURL = import.meta.env.VITE_BACKEND_URL ;

type PreferenceNode = {
  id: string;
  children: PreferenceNode[];
};

const preferences: PreferenceNode[] = [
  {
    id: "AI",
    children: [
      {
        id: "ML",
        children: [
          { id: "Supervised", children: [] },
          { id: "Unsupervised", children: [] },
          { id: "Reinforcement Learning", children: [] },
          {
            id: "Deep Learning",
            children: [
              { id: "CNNs", children: [] },
              { id: "RNNs", children: [] },
            ],
          },
        ],
      },
      {
        id: "Gen AI",
        children: [
          { id: "Chatbots", children: [] },
          { id: "Image Generation", children: [] },
          { id: "Text Generation", children: [] },
        ],
      },
    ],
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOnboarded = useSelector((state: RootState) => state.auth.onboarded);

  if (isOnboarded) {
    navigate("/home");
    return null;
  }

  const handleClick = (id: string) => {
    setSelected((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const renderTree = (nodes: PreferenceNode[]): PreferenceNode[] => {
    let result: PreferenceNode[] = [];
    nodes.forEach((node) => {
      result.push(node);
      if (node.children.length > 0) {
        result = result.concat(renderTree(node.children));
      }
    });
    return result;
  };

  const filteredPreferences = searchTerm
    ? renderTree(preferences).filter(item => 
        item.id.toLowerCase().includes(searchTerm.toLowerCase()))
    : renderTree(preferences);

    // const handleSubmit = async () => {
    //   try {
    //     console.log("🟡 Fetching user session data...");
    
    //     const res = await fetch(`${backendURL}/auth/me`, {
    //       method: "GET",
    //       credentials: "include",
    //     });
    
    //     const data = await res.json();
    //     console.log("📌 Received response from /auth/me:", data);
    
    //     if (data.existing) {
    //       const preferencesArray = Array.from(selected);
    //       console.log("📌 Selected preferences:", preferencesArray);
    
    //       console.log("🟡 Fetching session data...");
    //       const sessionRes = await fetch(`${backendURL}/auth/session`, {
    //         method: "GET",
    //         credentials: "include",
    //       });
    
    //       const sessionData = await sessionRes.json();
    //       console.log("📌 Received session data:", sessionData);
    
    //       if (!sessionData || !sessionData.user_id) {
    //         console.error("❌ Session expired. Please log in again.");
    //         alert("Session expired. Please log in again.");
    //         return;
    //       }
    
    //       const { provider, provider_id } = sessionData;
    
    //       console.log("🟡 Sending onboarding request...");
    //       const response = await fetch(`${backendURL}/api/auth/onboarding`, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         credentials: "include",
    //         body: JSON.stringify({ username, preferences: preferencesArray, provider, provider_id }),
    //       });
    
    //       console.log("📌 Received response from /auth/onboarding:", response);
    
    //       if (response.ok) {
    //         console.log("✅ Onboarding successful.");
    //         dispatch(setPreferences(preferencesArray));
    //         dispatch(setOnboarded(true));
    //         navigate("/home");
    //       } else {
    //         console.error("❌ Failed to update onboarding status.");
    //         alert("Failed to update onboarding status. Please try again.");
    //       }
    //     } else {
    //       console.error("❌ Authentication failed.");
    //       alert("Authentication failed. Please try logging in again.");
    //     }
    //   } catch (error) {
    //     console.error("❌ Error during onboarding:", error);
    //     alert("An error occurred. Please try again.");
    //   }
    // };


    const handleSubmit = async () => {
      try {
        console.log("🟡 Fetching user session data...");
    
        const res = await fetch(`${backendURL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });
    
        const data = await res.json();
        console.log("📌 Received response from /api/auth/me:", data);
    
        if (data.existing) {
          const preferencesArray = Array.from(selected);
          console.log("📌 Selected preferences:", preferencesArray);
    
        //   console.log("🟡 Sending onboarding request...");
        //   const response = await fetch(`${backendURL}/api/auth/onboarding`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     credentials: "include",
        //     body: JSON.stringify({ username, preferences: preferencesArray }),
        //   });
    
        //   console.log("📌 Received response from /api/auth/onboarding:", response);
    
        //   if (response.ok) {
        //     console.log("✅ Onboarding successful.");
        //     dispatch(setPreferences(preferencesArray));
        //     dispatch(setOnboarded(true));
        //     navigate("/home");
        //   } else {
        //     const errorMessage = await response.text();
        //     console.error("❌ Failed to update onboarding status:", errorMessage);
        //     alert("Failed to update onboarding status. Please try again.");
        //   }
        // } else {
        //   console.error("❌ Authentication failed.");
        //   alert("Authentication failed. Please try logging in again.");
        // }
        console.log("🟡 Sending onboarding request...");
      const response = await fetch(`${backendURL}/api/auth/onboarding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, preferences: preferencesArray }),
      });

      console.log("📌 Received response from /api/auth/onboarding:", response);

      if (response.ok) {
        console.log("✅ Inserted to Mongo successfully.");
        alert("Inserted to Mongo successfully!");
      } else {
        const errorMessage = await response.text();
        console.error("❌ Insertion failure:", errorMessage);
        alert("Insertion failure! Please try again.");
      }
    } else {
      console.error("❌ Authentication failed.");
      alert("Authentication failed. Please try logging in again.");
    }
      } catch (error) {
        console.error("❌ Error during onboarding:", error);
        alert("An error occurred. Please try again.");
      }
    };
    
    
    

  return (
    <div className="onboarding-container">
      {step === 1 ? (
        <div className="onboarding-card">
          <h2 className="onboarding-title">Enter your name</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="onboarding-input"
          />
          <button
            onClick={() => username.trim() ? setStep(2) : alert("Username is required")}
            className="onboarding-button"
          >
            Next
          </button>
        </div>
      ) : (
        <div className="onboarding-card preferences-card">
          <h2 className="onboarding-title">Pick tags that are relevant to you</h2>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Search deep learning etc"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="preferences-container">
            {filteredPreferences.map((item) => (
              <button 
                key={item.id} 
                onClick={() => handleClick(item.id)} 
                className={`preference-tag ${selected.has(item.id) ? 'selected' : ''}`}
              >
                {item.id}
              </button>
            ))}
          </div>
          
          <button onClick={handleSubmit} className="onboarding-button submit-button">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}