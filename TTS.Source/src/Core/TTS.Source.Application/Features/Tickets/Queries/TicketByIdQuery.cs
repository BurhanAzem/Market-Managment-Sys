using Mapster;
using MediatR;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Features.Tickets.Models;

namespace TTS.Source.Application.Features.Tickets.Queries
{
    public record TicketByIdQuery(Guid TicketId) : IRequest<TicketResponseModel>;

    public class TicketByIdQueryHandler : IRequestHandler<TicketByIdQuery, TicketResponseModel>
    {
        private readonly ITicketRepository _ticketRepository;
        public TicketByIdQueryHandler(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public async Task<TicketResponseModel> Handle(TicketByIdQuery request, CancellationToken cancellationToken)
        {
            var ticket = await _ticketRepository.GetSingleAsync(t => t.Id == request.TicketId, 
                cancellationToken, 
                t => t.Assignee, 
                t => t.Reporter,
                t => t.Project,
                t => t.Comments);

            if (ticket == null)
            {
                throw new NotFoundException("Ticket not found.");
            }

            return ticket.Adapt<TicketResponseModel>();
        }
    }
}

