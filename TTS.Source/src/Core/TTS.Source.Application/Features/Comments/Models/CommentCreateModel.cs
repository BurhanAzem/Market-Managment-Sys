
namespace TTS.Source.Application.Features.Comments.Models
{
    public record  CommentCreateModel(
        Guid TicketId,
        string Content);
    
}
