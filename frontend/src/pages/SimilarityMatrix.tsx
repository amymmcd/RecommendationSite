import { useEffect, useState } from 'react';
import axios from 'axios';

const SimilarityMatrix = () => {
  const [titles, setTitles] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [recommendations, setRecommendations] = useState<
    { title: string; score: number }[]
  >([]);

  useEffect(() => {
    axios.get('/api/similar/titles').then((res) => setTitles(res.data));
  }, []);

  const handleSelect = async (title: string) => {
    setSelectedTitle(title);
    const res = await axios.get('/api/similar/recommend', {
      params: { title, top: 5 },
    });
    setRecommendations(res.data);
  };

  return (
    <div className="p-4">
      <h1>Netflix Recommender</h1>
      <select
        onChange={(e) => handleSelect(e.target.value)}
        value={selectedTitle}
      >
        <option value="">Select a title</option>
        {titles.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {recommendations.length > 0 && (
        <ul className="mt-4">
          {recommendations.map((rec) => (
            <li key={rec.title}>
              <strong>{rec.title}</strong> – Similarity: {rec.score.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SimilarityMatrix;
