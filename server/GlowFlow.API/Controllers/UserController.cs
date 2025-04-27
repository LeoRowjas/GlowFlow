using GlowFlow.Application.Interfaces.Services;
using GlowFlow.Core.Entities;
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
    public async Task<IActionResult> GetUserById(string id)
    {
        var user = await _userService.GetByIdAsync(Guid.Parse(id));
        return Ok(user);
    }

    [Authorize]
    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateUser(string id, User user)
    {
        var guid = Guid.Parse(id);
        var idUser  = await _userService.GetByIdAsync(guid);
        if (idUser == null || idUser.Id != user.Id)
        {
            return BadRequest();
        }
        
        await _userService.UpdateAsync(user);
        return Ok();
    }

    [Authorize]
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        var guid = Guid.Parse(id);
        var user = await _userService.GetByIdAsync(guid);
        await _userService.DeleteAsync(guid);
        return Ok(user);
    }
}