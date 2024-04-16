using Microsoft.EntityFrameworkCore;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Persistance.RelationalDB.Repositories
{
    public class ProjectMembershipRepository : Repository<ProjectMembership>, IProjectMembershipRepository
    {
        private readonly TTSDBContext _dbContext;
        public ProjectMembershipRepository(TTSDBContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Member>> GetMembersByProjectId(Guid projectId, CancellationToken cancellationToken)
        {
            var members = await _dbContext.ProjectMemberships
                .AsNoTracking()
                .Include(x => x.Member)
                .Where(p => p.ProjectId == projectId)
                .Select(m => m.Member)
                .ToListAsync(cancellationToken);

            return members;
        }
    }
}
