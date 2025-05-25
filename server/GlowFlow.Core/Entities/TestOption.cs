using System;
using GlowFlow.Core.Entities.Base;
using GlowFlow.Core.Enums;

namespace GlowFlow.Core.Entities;

public class TestOption : BaseEntity
{
    public string Text { get; set; } = string.Empty;
    public SkinType SkinType { get; set; }
    public Guid QuestionId { get; set; }
    public TestQuestion Question { get; set; } = null!;
}