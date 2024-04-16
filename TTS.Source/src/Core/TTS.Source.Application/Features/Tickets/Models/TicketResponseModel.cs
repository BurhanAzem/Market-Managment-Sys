using TTS.Source.Application.Features.Comments.Models;
using TTS.Source.Application.Features.Projects.Models;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Application.Features.Tickets.Models
{
    public record TicketResponseModel(Guid Id,
        EntityIdNameResponseModel Project,
        EntityIdNameResponseModel Assignee,
        EntityIdNameResponseModel Reporter,
        string Name,
        string Description,
        DateOnly StartDate,
        DateOnly DueDate,
        TicketPriority TicketPriority,
        TicketStatus TicketStatus,
        IEnumerable<CommentResponseModel> Comments);

    public record TicketsResponseModel(IEnumerable<TicketResponseModel> Tickets);
}
