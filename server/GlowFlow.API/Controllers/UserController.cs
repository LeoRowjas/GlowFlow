using System.Security.Claims;
using GlowFlow.Application.Interfaces.Services;
using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GlowFlow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet("all")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userService.GetAllAsync();
        return Ok(users);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById([FromRoute]string id)
    {
        var user = await _userService.GetByIdAsync(Guid.Parse(id));
        return Ok(user);
    }

    [Authorize]
    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateUser([FromRoute]string id, [FromBody]User user)
    {
        var guid = Guid.Parse(id);
        var idUser  = await _userService.GetByIdAsync(guid);
        if (idUser == null || idUser.Id != user.Id)
        {
            return BadRequest();
        }
        
        await _userService.UpdateAsync(user);
        return Ok(user);
    }

    [Authorize]
    [HttpPatch("update/{id}/skin-type")]
    public async Task<IActionResult> UpdateUserSkinType([FromRoute]string id, [FromQuery]SkinType skinType)
    {
        var guid = Guid.Parse(id);
        var idUser  = await _userService.GetByIdAsync(guid);
        if (idUser == null) return BadRequest();
        
        await _userService.UpdateSkinTypeAsync(guid, skinType);
        return Ok(idUser);
    }

    [Authorize]
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteUser([FromRoute]string id)
    {
        var guid = Guid.Parse(id);
        var user = await _userService.GetByIdAsync(guid);
        await _userService.DeleteAsync(guid);
        return Ok(user);
    }

    [Authorize]
    [HttpPost("avatar/upload")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadAvatar([FromForm] UploadAvatarRequest request)
    {
        var file = request.File;
        
        if(file == null || file.Length == 0)
            return BadRequest("File is empty");

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
            return Unauthorized();
        
        await using var stream = file.OpenReadStream();
        var avatar = await _userService.UploadAvatarAsync(Guid.Parse(userId), stream, file.FileName, file.ContentType);
        
        return Ok(avatar);
    }

    [Authorize]
    [HttpDelete("avatar/delete")]
    public async Task<IActionResult> DeleteAvatar([FromQuery] string fileName)
    {
        await _userService.DeleteAvatarAsync(fileName);
        return Ok();
    }
}