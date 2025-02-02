import { useState } from 'react';
import axios from 'axios';
import background from '../assets/background.png';

interface Paper {
  arxiv_id: string;
  title: string;
  abstract: string;
  year: number;
  journal: string | null;
  difficulty_level: number;
  pdf_link: string;
}

interface ApiResponse {
  message: string;
  results: Paper[];
}

const Services = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("Deep Learning Papers Needed");
  const [difficulty, setDifficulty] = useState<string>("1");

  const fetchPapers = async () => {
    setLoading(true);
    try {
      const response = await axios.post<ApiResponse>(
        'https://server-git-main-siddhant-vishnus-projects.vercel.app/api/papers/fetch-by-query-and-tag',
        {
          query: searchQuery,
          difficulty_level: difficulty,
        }
      );
      setPapers(response.data.results);
    } catch (error) {
      console.error('Error fetching papers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full flex flex-col items-center text-white min-h-[180vh]"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-5xl mt-20 font-[Paytone_One] text-white">
        Explore Research Papers
      </h1>

      <div className="flex flex-row items-center gap-4 mt-10">
        <input
          className="w-[400px] h-[51px] px-4 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6e16e8]"
          placeholder="Search for research papers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <input
          type="number"
          min="0"
          max="3"
          className="w-[150px] h-[51px] px-4 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6e16e8] appearance-none"
          placeholder="Difficulty (0-3)"
          value={difficulty}
          onChange={(e) => {
            let value = Number(e.target.value);
            if (value < 0) value = 0;
            if (value > 3) value = 3;
            setDifficulty(value.toString());
          }}
          onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
        />

        <button
          className="h-[51px] px-6 bg-[#2c1250] border-2 border-[#693b93] text-white rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
          onClick={fetchPapers}
        >
          Search
        </button>
      </div>

      {loading ? (
        <div className="text-center text-lg mt-5">Loading...</div>
      ) : (
        <div className="flex justify-center w-full mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
            {papers.map((paper) => (
              <div
                key={paper.arxiv_id}
                className="bg-[#2c1250] border-2 border-[#693b93] text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <h2 className="text-xl font-bold mb-2">{paper.title}</h2>
                <p className="text-sm mb-2">{paper.abstract}</p>
                <div className="text-sm font-bold mb-2">
                  <span>Year: {paper.year}</span> | <span>Difficulty: {paper.difficulty_level}</span>
                </div>
                {paper.journal && (
                  <p className="text-sm mb-2">Journal: {paper.journal}</p>
                )}
                <a
                  href={paper.pdf_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Read PDF
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
