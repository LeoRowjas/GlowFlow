using GlowFlow.Core.Enums;
using GlowFlow.Core.Interfaces.Repositories;
using GlowFlow.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GlowFlow.Controllers;

[ApiController]
[Route("api/products")]
public class SkincareProductController : ControllerBase
{
    private readonly ISkincareProductRepository _skincareProductRepository;

    public SkincareProductController(ISkincareProductRepository skincareProductRepository)
    {
        _skincareProductRepository = skincareProductRepository;
    }

    [AllowAnonymous]
    [HttpGet("")]
    public async Task<IActionResult> GetAllSkincareProducts()
    {
        var products = await _skincareProductRepository.GetAllAsync();
        var dtos = products.Select(SkincareProductMapper.ToDto);
        return Ok(dtos);
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetSkincareProductById([FromRoute] Guid id)
    {
        var product = await _skincareProductRepository.GetByIdAsync(id);
        var dto = SkincareProductMapper.ToDto(product);
        return Ok(dto);
    }

    [AllowAnonymous]
    [HttpGet("by-skin-type")]
    public async Task<IActionResult> GetSkincareProductBySkinType([FromQuery] SkinType skinType)
    {
        var products = await _skincareProductRepository.GetBySkinTypeAsync(skinType);
        return Ok(products);
    }
}