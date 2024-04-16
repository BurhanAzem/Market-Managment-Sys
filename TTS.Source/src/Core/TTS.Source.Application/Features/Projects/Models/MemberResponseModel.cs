using TTS.Source.Application.Features.Comments.Models;
using TTS.Source.Application.Features.Projects.Models;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Application.Feature.Projects.Models
{
    public record MemberResponseModel(Guid Id, string Name);

    public record MembersResponseModel(IEnumerable<MemberResponseModel> Members);
}
