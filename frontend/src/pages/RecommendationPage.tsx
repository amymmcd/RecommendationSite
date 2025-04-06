import { useState, useEffect } from 'react';
import CollaborativeRecommendation from '../components/CollaborativeRecommendation';
import SimilarityMatrix from '../pages/SimilarityMatrix';
import { ContentFilteringList } from '../types/ContentFilteringList';

type ArticleSummary = {
  articleId: number;
  articleTitle: string;
};

function RecommendationPage() {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null
  );
  const [error, setError] = useState('');
  const [contentArticles, setContentArticles] = useState<
    ContentFilteringList[]
  >([]);
  const [selectedContentArticleId, setSelectedContentArticleId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          'http://localhost:4000/api/CollaborativeRecommendation/articles'
        );
        if (!response.ok) throw new Error('Failed to fetch item IDs.');
        const data = await response.json();
        setArticles(data);
        console.log(data);
      } catch (err) {
        setError('An error occurred while fetching item IDs.');
      }
    };

    fetchArticles();
  }, [selectedArticleId]); // ✅ Run only on initial mount

  useEffect(() => {
    const fetchContentArticles = async () => {
      try {
        const response = await fetch(
          'http://localhost:4000/api/Similar/titles'
        );
        if (!response.ok) throw new Error('Failed to fetch item IDs.');
        const data = await response.json();
        setContentArticles(data);
        console.log(data);
      } catch (err) {
        setError('An error occurred while fetching item IDs.');
      }
    };

    fetchContentArticles();
  }, [selectedContentArticleId]);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h2>News Article Recommender</h2>
      <br />
      <br />

      {/* Dropdown to select Item ID */}
      <div>
        <label>
          Select Article for Collaborative Filtering Recommendation:
          <br />
          <select
            value={selectedArticleId ?? ''}
            onChange={(e) => setSelectedArticleId(String(e.target.value))}
          >
            {/* Only show placeholder if nothing is selected */}
            {selectedArticleId === null && (
              <option value="" disabled hidden>
                Select an Article
              </option>
            )}
            {articles.map((a) => (
              <option key={a.articleId} value={a.articleId}>
                {a.articleTitle}
              </option>
            ))}
          </select>
        </label>
      </div>

      <br />

      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Show collaborative recommendation for selected article */}
      {selectedArticleId !== null && (
        <CollaborativeRecommendation itemId={selectedArticleId} />
      )}

      <br />
      <br />
      <br />

      <div>
        <label>
          Select Article for Content Filtering Recommendation:
          <br />
          <select
            value={selectedContentArticleId ?? ''}
            onChange={(e) =>
              setSelectedContentArticleId(String(e.target.value))
            }
          >
            {/* Only show placeholder if nothing is selected */}
            {selectedContentArticleId === null && (
              <option value="" disabled hidden>
                Select an Article
              </option>
            )}
            {contentArticles.map((ca) => (
              <option value={ca}>{ca}</option>
            ))}
          </select>
        </label>{' '}
        {/* Show content recommendation for selected article */}
        {selectedContentArticleId !== null && (
          <SimilarityMatrix itemId={selectedContentArticleId} />
        )}
      </div>
    </div>
  );
}

export default RecommendationPage;
