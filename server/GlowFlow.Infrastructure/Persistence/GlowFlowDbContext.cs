using GlowFlow.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace GlowFlow.Infrastructure.Persistence;

public class GlowFlowDbContext : DbContext
{
    public GlowFlowDbContext(DbContextOptions<GlowFlowDbContext> options) : base(options)
    { }
    
    public DbSet<User> Users { get; set; }
    public DbSet<SkincareIngredient> SkincareIngredients { get; set; }
    public DbSet<SkincareProduct> SkincareProducts { get; set; }
    public DbSet<Article> Articles { get; set; }
}