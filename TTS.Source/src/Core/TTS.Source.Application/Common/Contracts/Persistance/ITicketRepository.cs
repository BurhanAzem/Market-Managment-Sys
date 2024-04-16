using System.Linq.Expressions;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Common.Contracts.Persistance
{
    public interface ITicketRepository : IRepository<Ticket>
    {
        Task<IEnumerable<Ticket>> GetTicketsByProjectId(Guid projectId, CancellationToken cancellationToken);
        Task<IEnumerable<Ticket>> GetTicketsByAssignedMemberId(Guid memberId, CancellationToken cancellationToken);

    }
}
