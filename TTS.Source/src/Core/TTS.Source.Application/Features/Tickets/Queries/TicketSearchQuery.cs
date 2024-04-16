using Mapster;
using MediatR;
using System.Linq.Expressions;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Common.Models;
using TTS.Source.Application.Features.Projects.Models;
using TTS.Source.Application.Features.Tickets.Models;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Application.Features.Projects.Queries
{
    public record TicketSearchQuery(TicketSearchModel TicketSearchModel) : IRequest<TicketSearchResponseModel>;

    public class TicketSearchQueryHandler : CurrentMember, IRequestHandler<TicketSearchQuery, TicketSearchResponseModel>
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IProjectRepository _projectRepository;

        public TicketSearchQueryHandler(IProjectRepository projectRepository, ITicketRepository ticketRepository, ICurrentMemberProvider currentUserProvider)
            : base(currentUserProvider)
        {
            _ticketRepository = ticketRepository;
            _projectRepository = projectRepository;

        }

        public async Task<TicketSearchResponseModel> Handle(TicketSearchQuery request, CancellationToken cancellationToken)
        {
            var project = await _projectRepository.GetSingleAsync(p => p.Id == request.TicketSearchModel.ProjectId,
                           cancellationToken,
                           p => p.Owner,
                           p => p.Members);
            if (project == null)
            {
                throw new NotFoundException("Project not found");
            }
            if (!project.Members.Any(m => m.Id == CurrentMemberId))
            {
                throw new ForbiddenAccessException("You are not a member of this project");
            }

            Expression<Func<Ticket, bool>> predicate = ticket =>
                 ticket.ProjectId == request.TicketSearchModel.ProjectId &&
                 (string.IsNullOrEmpty(request.TicketSearchModel.TicketName) || ticket.Name.Contains(request.TicketSearchModel.TicketName)) &&
                 (request.TicketSearchModel.StartDate == null || ticket.StartDate >= request.TicketSearchModel.StartDate) &&
                 (request.TicketSearchModel.DueDate == null || ticket.DueDate <= request.TicketSearchModel.DueDate) &&
                 (request.TicketSearchModel.Status == null || ticket.TicketStatus == request.TicketSearchModel.Status);


            var paginatedTickets = await _ticketRepository.GetPagedAsync(
                predicate,
                request.TicketSearchModel.PageNumber,
                request.TicketSearchModel.PageSize
            );

            var ticketResponseModels = paginatedTickets.Items.Select(p => p.Adapt<TicketResponseModel>()).ToList();
            var ticketSearchResponseModel = new TicketSearchResponseModel(
                ticketResponseModels,
                paginatedTickets.PageNumber,
                paginatedTickets.TotalPages
            );

            return ticketSearchResponseModel;
        }
    }
}
