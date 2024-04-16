using TTS.Source.Domain.Shared;

namespace TTS.Source.Application.Features.Tickets.Models
{
    public record TicketCreateModel(
        Guid ProjectId,
        Guid AssigneeId,
        string Name,
        string Description,
        DateOnly StartDate,
        DateOnly DueDate,
        TicketPriority TicketPriority,
        TicketStatus TicketStatus);
}
