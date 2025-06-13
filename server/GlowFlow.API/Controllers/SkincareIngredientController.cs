using GlowFlow.Application.DTO.FromEntities;
using GlowFlow.Core.Interfaces.Repositories;
using GlowFlow.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GlowFlow.Controllers;

[ApiController]
[Route("api/skincare-ingredients")]
public class SkincareIngredientController : ControllerBase
{
    private readonly ISkincareIngredientRepository _repository;

    public SkincareIngredientController(ISkincareIngredientRepository repository)
    {
        _repository = repository;
    }
    
    [AllowAnonymous]
    [HttpGet("")]
    public async Task<IActionResult> GetIngredients()
    {
        var ingredients = await _repository.GetAllAsync();
        var dtos = ingredients.Select(SkincareIngredientMapper.ToDto);
        return Ok(dtos);
    }
    
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetIngredient([FromRoute]Guid id)
    {
        var ingredient = await _repository.GetByIdAsync(id);
        if (ingredient == null) return NotFound();
        
        var dto = SkincareIngredientMapper.ToDto(ingredient);
        return Ok(dto);
    }
    
    [AllowAnonymous]
    [HttpGet("search")]
    public async Task<IActionResult> SearchIngredients([FromQuery] string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            return BadRequest("Параметр поиска не может быть пустым");

        var ingredients = await _repository.SearchByNameAsync(name);
        var dtos = ingredients.Select(SkincareIngredientMapper.ToDto);
        return Ok(dtos);
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPost("")]
    public async Task<IActionResult> CreateIngredient([FromBody]SkincareIngredientDto ingredient)
    {
        var ingredientEntity = SkincareIngredientMapper.ToEntity(ingredient);
        var createdIngredient = await _repository.AddAsync(ingredientEntity);
        
        var dto = SkincareIngredientMapper.ToDto(createdIngredient);
        return CreatedAtAction(nameof(GetIngredient), new { id = createdIngredient.Id }, dto);
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateIngredient([FromRoute]Guid id, [FromBody]SkincareIngredientDto ingredient)
    {
        var existingIngredient = await _repository.GetByIdAsync(id);
        if (existingIngredient == null) return NotFound();
        
        existingIngredient.UpdateFromDto(ingredient);
        
        var updatedIngredient = await _repository.UpdateAsync(existingIngredient);
        var resultDto = SkincareIngredientMapper.ToDto(updatedIngredient);
    
        return Ok(resultDto);
    }
    
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteIngredient([FromRoute] Guid id)
    {
        var success = await _repository.DeleteAsync(id);
        if (!success) return NotFound();
        
        return NoContent();
    }
}