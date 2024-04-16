using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Common.Contracts.Persistance
{
    public interface IProjectMembershipRepository : IRepository<ProjectMembership>
    {
        Task<IEnumerable<Member>> GetMembersByProjectId(Guid projectId, CancellationToken cancellationToken);
    }
}
