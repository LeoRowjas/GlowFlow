using System.ComponentModel.DataAnnotations;
using GlowFlow.Core.Entities.Base;
using GlowFlow.Core.Enums;
using Microsoft.EntityFrameworkCore;

namespace GlowFlow.Core.Entities;

[Index(nameof(Email), IsUnique = true)]
public class User : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
    public string Username { get; set; } = string.Empty;
    [Required, EmailAddress, StringLength(100)]
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public SkinType SkinType { get; set; }
    public string? AvatarUrl { get; set; } = string.Empty;
    public UserRole Role { get; set; }
}