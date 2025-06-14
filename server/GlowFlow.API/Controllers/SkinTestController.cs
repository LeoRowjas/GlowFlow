using GlowFlow.Application.Interfaces;
using GlowFlow.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GlowFlow.Controllers;

[ApiController]
[Route("api/skin-test")]
public class SkinTestController : ControllerBase
{
    private readonly ITestService _testService;
    private const int REQUIRED_ANSWERS_COUNT = 20;

    public SkinTestController(ITestService testService)
    {
        _testService = testService;
    }
    
    [Authorize]
    [HttpGet("questions")]
    public async Task<IActionResult> GetQuestionsWithOptions()
    {
        var questions = await _testService.GetTestQuestionsWithOptionsAsync();
        return Ok(questions);
    }
    
    [Authorize]
    [HttpPost("submit")]
    public async Task<IActionResult> SubmitTest([FromBody] SubmitSkinTestRequest request)
    {
        try
        {
            var skinType = await _testService.GetSkinTypeFromAnswersAsync(request.OptionIds);
        
            return Ok(new 
            { 
                SkinType = skinType,
                AnswersCount = request.OptionIds.Count,
                CompletedAt = DateTime.UtcNow
            });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

}