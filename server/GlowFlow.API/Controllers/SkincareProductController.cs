using GlowFlow.Application.DTO.FromEntities;
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
        if (product == null) return NotFound();
        
        var dto = SkincareProductMapper.ToDto(product);
        return Ok(dto);
    }

    [AllowAnonymous]
    [HttpGet("by-skin-type")]
    public async Task<IActionResult> GetSkincareProductBySkinType([FromQuery] SkinType skinType)
    {
        var products = await _skincareProductRepository.GetBySkinTypeAsync(skinType);
        var dtos = products.Select(SkincareProductMapper.ToDto);
        return Ok(dtos);
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPost("")]
    public async Task<IActionResult> CreateSkincareProduct([FromBody] SkincareProductDto skincareProductDto)
    {
        var product = SkincareProductMapper.ToEntity(skincareProductDto);
        var createdProduct = await _skincareProductRepository.AddAsync(product);
        
        var resultDto = SkincareProductMapper.ToDto(createdProduct);
        return CreatedAtAction(nameof(GetSkincareProductById), new { id = createdProduct.Id }, resultDto);
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSkincareProduct([FromRoute] Guid id, [FromBody] SkincareProductDto skincareProductDto)
    {
        var existingProduct = await _skincareProductRepository.GetByIdAsync(id);
        if (existingProduct is null) return NotFound();
    
        existingProduct.UpdateFromDto(skincareProductDto);
    
        var updatedProduct = await _skincareProductRepository.UpdateAsync(existingProduct);
        var resultDto = SkincareProductMapper.ToDto(updatedProduct);
        return Ok(resultDto);

    }
    
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSkincareProduct([FromRoute] Guid id)
    {
        var success = await _skincareProductRepository.DeleteAsync(id);
        if (!success) return NotFound();
        
        return NoContent();
    }
}