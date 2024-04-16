using Mapster;
using MediatR;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Models;
using TTS.Source.Application.Features.Tickets.Models;
using TTS.Source.Application.Common.Exceptions;

namespace TTS.Source.Application.Features.Tickets.Commands.Edit
{
    public record TicketEditCommand(TicketEditModel TicketEditModel) : IRequest<TicketResponseModel>;

    public class TicketEditCommandHandler : CurrentMember, IRequestHandler<TicketEditCommand, TicketResponseModel>
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IProjectRepository _projectRepository;


        public TicketEditCommandHandler(ITicketRepository ticketRepository, ICurrentMemberProvider currentUserProvider, IProjectRepository projectRepository)
            : base(currentUserProvider)
        {
            _ticketRepository = ticketRepository;
            _projectRepository = projectRepository;
        }

        public async Task<TicketResponseModel> Handle(TicketEditCommand request, CancellationToken cancellationToken)
        {
            var ticket = await _ticketRepository.GetSingleAsync(p => p.Id == request.TicketEditModel.TicketId, cancellationToken, 
                t => t.Assignee,
                t => t.Reporter);

            if (ticket == null)
            {
                throw new NotFoundException("Ticket not found.");
            }

            var project = await _projectRepository.GetSingleAsync(p => p.Id == request.TicketEditModel.ProjectId, cancellationToken, p=> p.Memberships);

            if (project == null)
            {
                throw new NotFoundException("Project not found.");
            }

            if (!project.Memberships.Any(m => m.Id == CurrentMemberId))
            {
                throw new ForbiddenAccessException("You are not a member of this project.");
            }

            var currentMember = project.OwnerId == CurrentMemberId ? project.Owner : project.Memberships.Single(m => m.Id == CurrentMemberId).Member;

            ticket.Update(request.TicketEditModel.Name ?? ticket.Name,
                request.TicketEditModel.Description ?? ticket.Description,
                request.TicketEditModel.StartDate ?? ticket.StartDate,
                request.TicketEditModel.DueDate ?? ticket.DueDate,
                request.TicketEditModel.TicketPriority ?? ticket.TicketPriority,
                request.TicketEditModel.TicketStatus ?? ticket.TicketStatus,
                currentMember);

            var result = await _ticketRepository.UpdateAsync(ticket, cancellationToken);

            return result.Adapt<TicketResponseModel>();
        }
    }
}
