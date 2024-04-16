using TTS.Source.Domain.Shared;

namespace TTS.Source.Application.Features.Projects.Models
{
    public record ProjectSearchModel(string? ProjectName, DateOnly? StartDate, DateOnly? EndDate, ProjectStatus? Status, int PageNumber = 1, int PageSize = 10);
}
