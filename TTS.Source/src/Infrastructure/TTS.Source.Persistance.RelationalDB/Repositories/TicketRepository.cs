using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Persistance.RelationalDB.Repositories
{
    public class TicketRepository : Repository<Ticket>, ITicketRepository
    {
        private readonly TTSDBContext _dbContext;
        public TicketRepository(TTSDBContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Ticket>> GetTicketsByAssignedMemberId(Guid memberId, CancellationToken cancellationToken)
        {
            var tickets = await _dbContext.Tickets
                .AsNoTracking()
                .Include(x => x.Assignee)
                .Include(x => x.Reporter)
                .Include(p => p.Project)
                .Where(p => p.AssigneeId == memberId)
                .ToListAsync(cancellationToken);

            return tickets;
        }

        public async Task<IEnumerable<Ticket>> GetTicketsByProjectId(Guid projectId, CancellationToken cancellationToken)
        {
            var tickets = await _dbContext.Tickets
                .AsNoTracking()
                .Include(x => x.Assignee)
                .Include(x => x.Reporter)
                .Include(p => p.Project)
                .Where(p => p.ProjectId == projectId)
                .ToListAsync(cancellationToken);

            return tickets;
        }
    }
}
