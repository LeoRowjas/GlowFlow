using GlowFlow.Application.Interfaces.Services;
using GlowFlow.Mappers;
using GlowFlow.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GlowFlow.Controllers;

[ApiController]
[Route("api/articles")]
public class ArticleController : ControllerBase
{
    private readonly IArticleService _articleService;

    public ArticleController(IArticleService articleService)
    {
        _articleService = articleService;
    }

    [AllowAnonymous]
    [HttpGet("")]
    public async Task<IActionResult> GetAll()
    {
        var articles = await _articleService.GetAllAsync();
        return Ok(articles);
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute]Guid id)
    {
        var article = await _articleService.GetByIdAsync(id);
        if (article == null) return NotFound();
        return Ok(article);
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPost("")]
    public async Task<IActionResult> CreateArticle([FromBody]CreateArticleRequest request)
    {
        var article = await _articleService.AddAsync(ArticleMapper.ToEntity(request));
        return CreatedAtAction(nameof(GetById), new { id = article.Id }, article);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateArticle([FromRoute] Guid id, [FromBody] CreateArticleRequest request)
    {
        var existingArticle = await _articleService.GetByIdAsync(id);
        if (existingArticle == null) return NotFound();
        
        var updatedArticle = ArticleMapper.ToEntity(request);
        await _articleService.UpdateAsync(updatedArticle);
        return Ok(updatedArticle);
    }
    
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteArticle([FromRoute] Guid id)
    {
        var success = await _articleService.DeleteAsync(id);
        if (!success) return NotFound();
        return NoContent();
    }
}