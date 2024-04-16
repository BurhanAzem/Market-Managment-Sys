using Mapster;
using MediatR;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Features.Tickets.Models;

namespace TTS.Source.Application.Features.Tickets.Queries
{
    public record TicketsByAssignedMemberIdQuery(Guid MemberId) : IRequest<TicketsResponseModel>;

    public class TicketsByMemberIdQueryHandler : IRequestHandler<TicketsByAssignedMemberIdQuery, TicketsResponseModel>
    {
        private readonly ITicketRepository _ticketRepository;

        public TicketsByMemberIdQueryHandler(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public async Task<TicketsResponseModel> Handle(TicketsByAssignedMemberIdQuery request, CancellationToken cancellationToken)
        {
            var tickets = await _ticketRepository.GetTicketsByAssignedMemberId(request.MemberId, cancellationToken);

            var ticketsRespone = tickets.Select(p => p.Adapt<TicketResponseModel>()).ToList();

            return new TicketsResponseModel(ticketsRespone);
        }
    }
}

