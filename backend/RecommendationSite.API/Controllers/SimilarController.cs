using Microsoft.AspNetCore.Mvc;
using RecommendationSite.API.Services;

namespace RecommendationSite.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SimilarController : ControllerBase
    {
        private readonly SimilarityService _similarityService;

        public SimilarController(SimilarityService similarityService)
        {
            _similarityService = similarityService;
        }

        [HttpGet("titles")]
        public IActionResult GetTitles()
        {
            return Ok(_similarityService.GetAllTitles());
        }

        [HttpGet("recommend")]
        public IActionResult GetRecommendations([FromQuery] string title, [FromQuery] int top = 5)
        {
            var similar = _similarityService.GetTopSimilar(title, top);
            return Ok(similar.Select(s => new { title = s.Title, score = s.Score }));
        }
    }

}
