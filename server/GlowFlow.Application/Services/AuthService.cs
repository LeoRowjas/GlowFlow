using GlowFlow.Application.DTO.Auth;
using GlowFlow.Application.Interfaces.Security;
using GlowFlow.Core.Entities;
using GlowFlow.Core.Interfaces.Repositories;

namespace GlowFlow.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtTokenService _jwtService;
    private readonly IPasswordHasher _passwordHasher;

    public AuthService(IUserRepository userRepository, IJwtTokenService jwtService, IPasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
        _passwordHasher = passwordHasher;
    }

    public async Task<LoginResponseDto> LoginAsync(LoginRequestDto request)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email);
        if (user == null || !_passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password)) 
            //TODO: прикрутить нот фаунд эксепшн, потому что строка сверху будет кидать исключение
        {
            throw new Exception(); //TODO: прикрутить ошибку неправильных кредентиалс
        }
        
        var token = _jwtService.GenerateJwtToken(user.Id, user.Email);
        var response = new LoginResponseDto()
        {
            Email = user.Email,
            Token = token,
        };
        return response;
    }

    public async Task<LoginResponseDto> RegisterAsync(RegisterRequestDto request)
    {
        var existingUser = await _userRepository.GetByEmailAsync(request.Email);
        if (existingUser != null)
        {
            throw new Exception();
        }
        
        var user = new User()
        {
            Email = request.Email,
            Name = request.Name,
            Username = request.Username,
        };
        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);
        
        await _userRepository.AddAsync(user);
        var token = _jwtService.GenerateJwtToken(user.Id, user.Email);

        return new LoginResponseDto()
        {
            UserId = user.Id,
            Email = user.Email,
            Token = token
        };
    }
}