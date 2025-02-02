import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const API_BASE_URL = "https://pbl-se-server-git-main-siddhant-vishnus-projects.vercel.app/api"; // Replace with your backend URL

const Dashboard = () => {
  const [orgPapers, setOrgPapers] = useState<any>(null);
  const [mostCitedPapers, setMostCitedPapers] = useState<any>(null);
  const [difficultyByCategory, setDifficultyByCategory] = useState<any>(null);
  const [topAuthorsDifficulty, setTopAuthorsDifficulty] = useState<any>(null);
  const [topOrganizationsByCitations, setTopOrganizationsByCitations] = useState<any>(null);
  const [papersPerYear, setPapersPerYear] = useState<any>(null);
  const [topAuthorsByCitations, setTopAuthorsByCitations] = useState<any>(null);

  // Function to fetch data from API
  const fetchData = async (endpoint: string, setState: any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`);
      setState(response.data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    fetchData("/analytics/top-organization", setOrgPapers);
    fetchData("/analytics/most-cited-papers", setMostCitedPapers);
    fetchData("/analytics/avg-difficulty-by-category", setDifficultyByCategory);
    fetchData("/analytics/top-authors-by-difficulty", setTopAuthorsDifficulty);
    fetchData("/analytics/top-organizations-by-citations", setTopOrganizationsByCitations);
    fetchData("/analytics/papers-per-year", setPapersPerYear);
    fetchData("/analytics/top-authors-by-citations", setTopAuthorsByCitations);
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Research Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Top Organizations by Paper Count */}
        {orgPapers && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Top Organizations by Paper Count</h2>
            <Bar data={orgPapers} />
          </div>
        )}

        {/* Average Difficulty by Category */}
        {difficultyByCategory && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Avg. Difficulty by Category</h2>
            <Bar data={difficultyByCategory} />
          </div>
        )}

        {/* Top Authors by Average Difficulty */}
        {topAuthorsDifficulty && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Top Authors by Difficulty</h2>
            <Bar data={topAuthorsDifficulty} />
          </div>
        )}

        {/* Top Organizations by Citations */}
        {topOrganizationsByCitations && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Top Organizations by Citations</h2>
            <Bar data={topOrganizationsByCitations} />
          </div>
        )}

        {/* Papers Published Per Year */}
        {papersPerYear && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Papers Published Per Year</h2>
            <Line data={papersPerYear} />
          </div>
        )}

        {/* Top Authors by Citations */}
        {topAuthorsByCitations && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Top Authors by Citations</h2>
            <Bar data={topAuthorsByCitations} />
          </div>
        )}
        
        {/* Most Cited Papers */}
        {mostCitedPapers && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Most Cited Papers</h2>
            <Bar data={mostCitedPapers} />
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
