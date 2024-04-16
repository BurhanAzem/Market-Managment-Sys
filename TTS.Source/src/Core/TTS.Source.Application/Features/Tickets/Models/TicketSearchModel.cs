
using TTS.Source.Domain.Shared;

namespace TTS.Source.Application.Features.Tickets.Models
{
    public record TicketSearchModel(Guid ProjectId, string? TicketName, DateOnly? StartDate, DateOnly? DueDate, TicketStatus? Status, int PageNumber = 1, int PageSize = 10);

}
