using Mapster;
using MediatR;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Features.Tickets.Models;

namespace TTS.Source.Application.Features.Tickets.Queries
{
    public record TicketsByProjectIdQuery(Guid ProjectId) : IRequest<TicketsResponseModel>;

    public class TicketsByProjectIdQueryHandler : IRequestHandler<TicketsByProjectIdQuery, TicketsResponseModel>
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IProjectRepository _projectRepository;

        public TicketsByProjectIdQueryHandler(ITicketRepository ticketRepository, IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
            _ticketRepository = ticketRepository;
        }

        public async Task<TicketsResponseModel> Handle(TicketsByProjectIdQuery request, CancellationToken cancellationToken)
        {
            var projectExists = await _projectRepository.ExistsAsync(p => p.Id == request.ProjectId, cancellationToken);

            if (!projectExists)
            {
                throw new NotFoundException("Project not found.");
            }

            var tickets = await _ticketRepository.GetTicketsByProjectId(request.ProjectId, cancellationToken);

            var ticketsResponse = tickets.Select(p => p.Adapt<TicketResponseModel>()).ToList();

            return new TicketsResponseModel(ticketsResponse);
        }
    }
}

