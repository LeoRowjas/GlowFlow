using System.Collections.Generic;
using GlowFlow.Core.Entities.Base;

namespace GlowFlow.Core.Entities;

public class TestQuestion : BaseEntity
{
    public string Text { get; set; } = string.Empty;
    public List<TestOption> Options { get; set; } = new();
}