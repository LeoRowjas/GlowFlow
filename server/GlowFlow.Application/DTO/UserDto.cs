using GlowFlow.Core.Enums;

namespace GlowFlow.Application.DTO;

public class UserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
    public SkinType SkinType { get; set; }
}