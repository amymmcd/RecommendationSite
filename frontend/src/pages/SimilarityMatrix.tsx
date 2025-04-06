import { useEffect, useState } from 'react';
import { SimilarityRecommendation } from '../types/ContentRecommendations';

type SimilarityMatrixProps = {
  itemId: string;
};

const SimilarityMatrix = ({ itemId }: SimilarityMatrixProps) => {
  const [recommendations2, setRecommendations2] = useState<
    SimilarityRecommendation[]
  >([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const url = `http://localhost:4000/api/Similar/recommend?title=${itemId}&top=5`;
    console.log("Fetching from:", url);
    
    console.log('Current itemId:', itemId); // <--- Add this
    if (!itemId) return;

    

    const fetchRecommendation = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/Similar/recommend?title=${itemId}&top=5`
        );
        if (!response.ok) throw new Error('Failed to fetch recommendation.');
        const data = await response.json();
        console.log('Fetched data for content filtering recommendations:', data);
        setRecommendations2(data);
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching recommendations.');
        setRecommendations2([]);
      }

    };

    fetchRecommendation();
  }, [itemId]);

  return (
    <div className="p-4 border rounded shadow mt-4 text-left">

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3 className="font-bold text-lg mb-2">
        Content Filtering Recommendations for Article #{itemId}:{' '}
      </h3>

      {Array.isArray(recommendations2) && recommendations2.length > 0 ? (
        <ol style={{ textAlign: 'left' }}>
          {recommendations2.map((r) => (
            <li key={r.title}>{r.title}</li>
          ))}
        </ol>
      ) : (
        !error && <p>No recommendations available.</p>
      )}
    </div>
  );
};

export default SimilarityMatrix;




/* import { useEffect, useState } from 'react';
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
 */
