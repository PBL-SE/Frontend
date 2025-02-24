import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPreferences, setOnboarded } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

import { RootState } from "../app/store";

const backendURL = "http://localhost:3000";

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
  }
];

export default function Onboarding() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isOnboarded = useSelector((state: RootState) => state.auth.onboarded);

  if (isOnboarded) {
    navigate("/home");
    return null;
  }

  const handleClick = (id: string) => {
    setSelected((prev) => new Set(prev.add(id)));
  };

  const handleDoubleClick = (id: string) => {
    setSelected((prev) => {
      const newSelected = new Set(prev);
      newSelected.delete(id);
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

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${backendURL}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.existing) {
        const preferencesArray = Array.from(selected);
        const response = await fetch(`${backendURL}/api/auth/onboarding`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          dispatch(setPreferences(preferencesArray));
          dispatch(setOnboarded(true));
          navigate("/home");
        } else {
          alert("Failed to update onboarding status. Please try again.");
        }
      } else {
        alert("Authentication failed. Please try logging in again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#1a1a1a", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "800px", padding: "30px", background: "#222", textAlign: "center", borderRadius: "12px", overflowY: "auto" }}>
        <h2 style={{ marginBottom: "15px", fontSize: "24px" }}>Select Your Preferences</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", padding: "15px", maxHeight: "400px", overflowY: "auto" }}>
          {renderTree(preferences).map((item) => (
            <div key={item.id} onClick={() => handleClick(item.id)} onDoubleClick={() => handleDoubleClick(item.id)} style={{ padding: "12px", borderRadius: "8px", background: selected.has(item.id) ? "lightgreen" : "#d3d3d3", color: "black", cursor: "pointer", textAlign: "center", minWidth: "140px", fontSize: "14px", border: selected.has(item.id) ? "2px solid white" : "none" }}>
              {item.id}
            </div>
          ))}
        </div>
        <button onClick={handleSubmit} style={{ marginTop: "15px", padding: "12px", borderRadius: "6px", background: "#d9eafc", color: "black", cursor: "pointer", fontSize: "16px", border: "none" }}>
          Submit
        </button>
      </div>
    </div>
  );
}
