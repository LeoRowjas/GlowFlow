using GlowFlow.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace GlowFlow.Infrastructure.Common;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    { }
    
    public DbSet<User> Users { get; set; }
    public DbSet<SkincareIngredient> SkincareIngredients { get; set; }
    public DbSet<SkincareProduct> SkincareProducts { get; set; }
    public DbSet<Article> Articles { get; set; }
}