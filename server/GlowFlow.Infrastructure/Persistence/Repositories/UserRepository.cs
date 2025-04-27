using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace GlowFlow.Infrastructure.Persistence.Repositories;

public class UserRepository : IUserRepository
{
    private readonly GlowFlowDbContext _context;

    public UserRepository(GlowFlowDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await _context.Users.AsNoTracking().FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _context.Users.AsNoTracking().ToListAsync();
    }

    public async Task<User> AddAsync(User entity)
    {
        if(entity == null) throw new ArgumentNullException(nameof(entity));
        await _context.Users.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<User> UpdateAsync(User entity)
    {   
        if(entity == null) throw new ArgumentNullException(nameof(entity));
        _context.Users.Update(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return false; //TODO:можно создать юзер нот фаунд эксепшн и изменить возвращаемый тип
        
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        var normalized = email.Trim().ToLower();
        return await _context.Users
            .FirstOrDefaultAsync(x => x.Email.Equals(normalized)) ?? null; //TODO: прикрутить нот фаунд эксепшн
    }

    public async Task<User?> UpdateSkinTypeAsync(Guid id, SkinType skinType)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) throw new Exception(); //TODO: прикрутить нот фаунд эксепшн
        
        user.SkinType = skinType;
        _context.Users.Update(user);
        await _context.SaveChangesAsync();

        return user;
    }
}