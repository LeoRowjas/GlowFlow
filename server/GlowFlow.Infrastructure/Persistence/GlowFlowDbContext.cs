using GlowFlow.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace GlowFlow.Infrastructure.Persistence;

public class GlowFlowDbContext : DbContext
{
    public GlowFlowDbContext(DbContextOptions<GlowFlowDbContext> options) : base(options)
    { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var idProperty = entityType.FindProperty("Id");
            if (idProperty != null && idProperty.ClrType == typeof(Guid))
            {
                idProperty.SetDefaultValueSql("gen_random_uuid()");
            }
        }
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<User> Users { get; set; }
    public DbSet<SkincareIngredient> SkincareIngredients { get; set; }
    public DbSet<SkincareProduct> SkincareProducts { get; set; }
    public DbSet<Article> Articles { get; set; }
    public DbSet<TestOption> TestOptions { get; set; }
    public DbSet<TestQuestion> TestQuestions { get; set; }
}