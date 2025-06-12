using GlowFlow.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace GlowFlow.Helpers
{
    public static class DbMigrationHelper
    {
        public static async Task MigrateAndSeedAsync(IServiceProvider serviceProvider, int maxRetries = 10, int delaySeconds = 3)
        {
            for (int attempt = 1; attempt <= maxRetries; attempt++)
            {
                using var scope = serviceProvider.CreateScope();
                try
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<GlowFlowDbContext>();
                    await dbContext.Database.MigrateAsync();
                    var logger = scope.ServiceProvider.GetRequiredService<ILogger<DataSeedInitializer>>();
                    var initializer = new DataSeedInitializer(dbContext, logger);
                    await initializer.SeedDataAsync();
                    break;
                }
                catch (Exception ex)
                {
                    if (attempt == maxRetries)
                        throw;
                    Console.WriteLine($"[DbMigrationHelper] Не удалось подключиться к БД (попытка {attempt} из {maxRetries}): {ex.Message}");
                    await Task.Delay(TimeSpan.FromSeconds(delaySeconds));
                }
            }
        }
    }
}

