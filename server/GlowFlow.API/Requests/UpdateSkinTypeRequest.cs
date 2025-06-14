using System.ComponentModel.DataAnnotations;
using GlowFlow.Core.Enums;

namespace GlowFlow.Requests;

public class UpdateSkinTypeRequest
{
    [Required(ErrorMessage = "Тип кожи обязателен")]
    public SkinType SkinType { get; set; }
}