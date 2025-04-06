namespace RecommendationSite.API.Services
{
    public class SimilarityService
    {
        private readonly Dictionary<string, Dictionary<string, float>> _matrix;

        public SimilarityService(string csvPath)
        {
            _matrix = LoadSimilarityMatrix(csvPath);
        }

        private Dictionary<string, Dictionary<string, float>> LoadSimilarityMatrix(string path)
        {
            var matrix = new Dictionary<string, Dictionary<string, float>>();
            var lines = File.ReadAllLines(path);
            var headers = lines[0].Split(',').Skip(1).ToArray(); // skip first column (title name)

            for (int i = 1; i < lines.Length; i++)
            {
                var row = lines[i].Split(',');
                var title = row[0];
                matrix[title] = new Dictionary<string, float>();

                for (int j = 1; j < row.Length; j++)
                {
                    if (float.TryParse(row[j], out float sim))
                    {
                        matrix[title][headers[j - 1]] = sim;
                    }
                }
            }

            return matrix;
        }

        public List<(string Title, float Score)> GetTopSimilar(string title, int topN = 5)
        {
            if (!_matrix.ContainsKey(title)) return new List<(string, float)>();

            return _matrix[title]
                .Where(kv => kv.Key != title)
                .OrderByDescending(kv => kv.Value)
                .Take(topN)
                .Select(kv => (kv.Key, kv.Value))
                .ToList();
        }

        public List<string> GetAllTitles() => _matrix.Keys.ToList();
    }

}
