using System.Security.Claims;
using GlowFlow.Application.DTO.FromEntities;
using GlowFlow.Application.Exceptions;
using GlowFlow.Application.Interfaces.Services;
using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GlowFlow.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    
    [AllowAnonymous]
    [HttpGet("")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userService.GetAllAsync();
        return Ok(users);
    }
    
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById([FromRoute]Guid id)
    {
        var user = await _userService.GetByIdAsync(id);
        if (user == null) return NotFound();
        
        return Ok(user);
    }
    
    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userId = GetCurrentUserId();
        var user = await _userService.GetByIdAsync(userId);
        if (user == null) return NotFound();
        
        return Ok(user);
    }


    [Authorize]
    [HttpPut("me")]
    public async Task<IActionResult> UpdateCurrentUser([FromBody]UpdateUserDto user)
    {
        var idUser  = GetCurrentUserId();
        await _userService.UpdateAsync(idUser, user);
        return Ok(user);
    }

    [Authorize]
    [HttpPatch("skin-type")]
    public async Task<IActionResult> UpdateSkinType([FromBody]UpdateSkinTypeRequest request)
    {
        var idUser  = GetCurrentUserId();
        var updatedUser = await _userService.UpdateSkinTypeAsync(idUser, request.SkinType);
        
        return Ok(updatedUser);
    }

    [Authorize]
    [HttpDelete("me")]
    public async Task<IActionResult> DeleteCurrentUser()
    {
        var idUser  = GetCurrentUserId();
        await _userService.DeleteAsync(idUser);
        return NoContent();
    }

    [Authorize]
    [HttpPost("me/avatar")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadAvatar([FromForm] UploadAvatarRequest request)
    {
        if (request.File == null || request.File.Length == 0)
            return BadRequest("Файл отсутствует или пустой");

        var userId = GetCurrentUserId();
        
        await using var stream = request.File.OpenReadStream();
        var avatar = await _userService.UploadAvatarAsync(
            userId, 
            stream,
            request.File.FileName, 
            request.File.ContentType);
        
        return Ok(avatar);
    }

    [Authorize]
    [HttpDelete("me/avatar")]
    public async Task<IActionResult> DeleteAvatar()
    {
        var userId = GetCurrentUserId();
        var success = await _userService.DeleteAvatarAsync(userId);
        
        if(!success) return NotFound("Аватар не найден");
        return NoContent();
    }
    
    
    private Guid GetCurrentUserId()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        if (string.IsNullOrEmpty(userIdClaim))
            throw new UnauthorizedAccessException("Пользователь не авторизован");
        
        if (!Guid.TryParse(userIdClaim, out var userId))
            throw new ValidationException("Некорректный ID пользователя");
        
        return userId;
    }
}