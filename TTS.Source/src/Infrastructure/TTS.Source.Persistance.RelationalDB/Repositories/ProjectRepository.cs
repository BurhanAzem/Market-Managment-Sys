using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Persistance.RelationalDB.Repositories
{
    public class ProjectRepository : Repository<Project>, IProjectRepository
    {
        private readonly TTSDBContext _dbContext;
        public ProjectRepository(TTSDBContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Project?> GetProject(Expression<Func<Project, bool>> predicate)
        {
            return await _dbContext.Projects
                .Include(p => p.Owner)
                .Include(p => p.Memberships)
                .ThenInclude(m => m.Member)
                .FirstOrDefaultAsync(predicate);
        }
    }
}
