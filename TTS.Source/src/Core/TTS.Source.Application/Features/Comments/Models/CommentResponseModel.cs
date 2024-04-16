using TTS.Source.Application.Features.Projects.Models;

namespace TTS.Source.Application.Features.Comments.Models
{
    public record CommentResponseModel(
        Guid Id,
        EntityIdNameResponseModel Ticket,
        EntityIdNameResponseModel Member,
        string Content);

}
