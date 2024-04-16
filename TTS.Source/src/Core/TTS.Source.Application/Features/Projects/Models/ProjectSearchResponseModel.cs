using TTS.Source.Application.Common.Models;

namespace TTS.Source.Application.Features.Projects.Models
{
    public record ProjectSearchResponseModel(IEnumerable<ProjectResponseModel> Projects,
        int PageNumber,
        int TotalPages);
}
