using GlowFlow.Application.DTO.Auth;
using GlowFlow.Application.Interfaces;
using GlowFlow.Core.Interfaces.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace GlowFlow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestDto loginRequestDto)
    {
        var response = await _authService.LoginAsync(loginRequestDto);
        return Ok(response);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequestDto registrationRequest)
    {
        var response = await _authService.RegisterAsync(registrationRequest);
        return Ok(response);
    }
}