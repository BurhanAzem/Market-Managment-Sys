using TTS.Source.Domain.Shared;

namespace TTS.Source.Application.Features.Projects.Models
{
    public record ProjectMembersResponseModel(Guid Id,
            EntityIdNameResponseModel Owner,
            string Name,
            string Description,
            DateOnly StartDate,
            DateOnly EndDate,
            ProjectStatus ProjectStatus,
            IEnumerable<EntityIdNameResponseModel> Members);
}
