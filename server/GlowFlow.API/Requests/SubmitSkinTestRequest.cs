using GlowFlow.Core.Enums;

namespace GlowFlow.Application.DTO.SkinTest;

public class SubmitSkinTestRequest
{
    public Guid UserId { get; set; }
    public SkinType SkinType { get; set; }
}