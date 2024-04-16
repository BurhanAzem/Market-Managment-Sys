using TTS.Source.Domain.Shared;

namespace TTS.Source.Application.Features.Tickets.Models
{
    public record TicketEditModel(Guid TicketId,
        Guid ProjectId,
        string? Name,
        string? Description,
        DateOnly? StartDate,
        DateOnly? DueDate,
        TicketPriority? TicketPriority,
        TicketStatus? TicketStatus,
        Guid? AssigneeId);
}
