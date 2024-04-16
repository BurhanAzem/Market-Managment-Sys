namespace TTS.Source.Application.Features.Tickets.Models
{
    public record TicketSearchResponseModel(IEnumerable<TicketResponseModel> Tickets,
        int PageNumber,
        int TotalPages);
}
