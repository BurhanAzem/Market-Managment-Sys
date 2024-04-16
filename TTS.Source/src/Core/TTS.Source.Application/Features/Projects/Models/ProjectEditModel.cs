using TTS.Source.Domain.Shared;

namespace TTS.Source.Application.Features.Projects.Models
{
    public record ProjectEditModel(Guid ProjectId,
        string? Name,
        string? Description,
        DateOnly? StartDate,
        DateOnly? EndDate,
        ProjectStatus? ProjectStatus);
}