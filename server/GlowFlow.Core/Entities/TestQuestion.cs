using System.ComponentModel.DataAnnotations;
using GlowFlow.Core.Entities.Base;

namespace GlowFlow.Core.Entities;

public class TestQuestion : BaseEntity
{
    [Required]
    public string Text { get; set; } = string.Empty; 
    public List<TestOption> Options { get; set; } = new List<TestOption>();
}