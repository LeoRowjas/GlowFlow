using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GlowFlow.Application.Interfaces.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace GlowFlow.Infrastructure.Services;

public class JwtTokenService : IJwtTokenService
{
    private readonly string? _secretKey;
    private readonly string? _issuer;
    private readonly string? _audience;
    
    public JwtTokenService(IConfiguration configuration)
    {
        _secretKey = configuration["Jwt:SecretKey"];
        _issuer = configuration["Jwt:Issuer"];
        _audience = configuration["Jwt:Audience"];
    }

    public string GenerateJwtToken(Guid userId, string email)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
            new Claim(ClaimTypes.Email, email)
        };
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _secretKey ?? throw new InvalidOperationException("Jwt key not found")));
        
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);
        
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}