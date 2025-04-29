using GlowFlow.Core.Entities;
using GlowFlow.Core.Interfaces.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GlowFlow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SkincareProductController : ControllerBase
{
    private readonly ISkincareProductRepository _skincareProductRepository;

    public SkincareProductController(ISkincareProductRepository skincareProductRepository)
    {
        _skincareProductRepository = skincareProductRepository;
    }

    [AllowAnonymous]
    [HttpGet("all")]
    public async Task<IActionResult> GetAllSkincareProducts()
    {
        var products = await _skincareProductRepository.GetAllAsync();
        return Ok(products);
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetSkincareProductById([FromBody] string id)
    {
        var product = await _skincareProductRepository.GetByIdAsync(Guid.Parse(id));
        return Ok(product);
    }
}