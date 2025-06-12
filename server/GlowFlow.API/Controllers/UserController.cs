using System.Security.Claims;
using GlowFlow.Application.DTO.FromEntities;
using GlowFlow.Application.Exceptions;
using GlowFlow.Application.Interfaces.Services;
using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.DTO;
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
        return Ok(user);
    }

    [Authorize]
    [HttpPut("me")]
    public async Task<IActionResult> UpdateUser([FromBody]UpdateUserDto user)
    {
        var idUser  = GetCurrentUserId();
        await _userService.UpdateAsync(idUser, user);
        return Ok(user);
    }

    [Authorize]
    [HttpPatch("skin-type")]
    public async Task<IActionResult> UpdateUserSkinType([FromBody]SkinType skinType)
    {
        var idUser  = GetCurrentUserId();
        await _userService.UpdateSkinTypeAsync(idUser, skinType);
        return Ok(idUser);
    }

    [Authorize]
    [HttpDelete("me")]
    public async Task<IActionResult> DeleteUser()
    {
        var idUser  = GetCurrentUserId();
        await _userService.DeleteAsync(idUser);
        return Ok("User deleted");
    }

    [Authorize]
    [HttpPost("me/avatar")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadAvatar([FromForm] UploadAvatarRequest request)
    {
        var file = request.File;

        if (file.Length == 0)
            throw new ValidationException("Файл отсутствует или пустой");

        var userId = GetCurrentUserId();
        
        await using var stream = file.OpenReadStream();
        var avatar = await _userService.UploadAvatarAsync(userId, stream, file.FileName, file.ContentType);
        
        return Ok(avatar);
    }

    [Authorize]
    [HttpDelete("me/avatar")]
    public async Task<IActionResult> DeleteAvatar([FromQuery] string fileName)
    {
        var userId = GetCurrentUserId();
        await _userService.DeleteAvatarAsync(userId, fileName);
        return Ok();
    }
    
    
    private Guid GetCurrentUserId()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if(userId == null)
            throw new UnauthorizedAccessException();
        
        return Guid.Parse(userId);
    }
}