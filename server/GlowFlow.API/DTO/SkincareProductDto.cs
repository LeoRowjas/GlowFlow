namespace GlowFlow.DTO;

public class SkincareProductDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImageLink { get; set; } = string.Empty;
    public List<int> SuitableSkinTypes { get; set; } = new();
    public List<Guid> Ingredients { get; set; } = new();
}