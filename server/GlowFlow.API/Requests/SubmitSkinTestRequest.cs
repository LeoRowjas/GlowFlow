using System.ComponentModel.DataAnnotations;

namespace GlowFlow.Requests;

public class SubmitSkinTestRequest
{
    [Required(ErrorMessage = "Ответы обязательны")]
    [MinLength(20, ErrorMessage = "Тест должен содержать ровно 20 ответов")]
    [MaxLength(20, ErrorMessage = "Тест должен содержать ровно 20 ответов")]
    public List<Guid> OptionIds { get; set; } = new();
}