using GlowFlow.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GlowFlow.Controllers;

[ApiController]
[Route("api/skin-test")]
public class SkinTestController : ControllerBase
{
    private readonly ITestService _testService;

    public SkinTestController(ITestService testService)
    {
        _testService = testService;
    }

    [Authorize]
    [HttpGet("questions")]
    public async Task<IActionResult> GetQuestionsWithOptionsAsync()
    {
        var questions = await _testService.GetTestQuestionsWithOptionsAsync();
        return Ok(questions);
    }

    [Authorize]
    [HttpPost("submit")]
    public async Task<IActionResult> SubmitTestAsync([FromBody]List<Guid> optionsId)
    {
        var result = await _testService.GetSkinTypeFromAnswersAsync(optionsId);
        return Ok(result);
    }
}