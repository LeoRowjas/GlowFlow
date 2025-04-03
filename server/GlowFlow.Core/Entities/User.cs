using GlowFlow.Core.Entities.Base;
using GlowFlow.Core.Enums;

namespace GlowFlow.Core.Entities;

public class User : BaseEntity
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public SkinType SkinType { get; set; }
}