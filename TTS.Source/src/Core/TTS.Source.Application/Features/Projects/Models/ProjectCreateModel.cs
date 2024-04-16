using TTS.Source.Domain.Shared;

namespace TTS.Source.Application.Features.Projects.Models
{
    public record ProjectCreateModel(string Name,
        string Description,
        DateOnly StartDate,
        DateOnly EndDate,
        ProjectStatus ProjectStatus);
}