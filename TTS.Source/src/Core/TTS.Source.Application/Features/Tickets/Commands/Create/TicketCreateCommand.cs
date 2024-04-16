using Mapster;
using MediatR;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Common.Models;
using TTS.Source.Application.Features.Tickets.Models;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Features.Tickets.Commands.Create
{
    public record TicketCreateCommand(TicketCreateModel TicketCreateModel) : IRequest<TicketResponseModel>;

    public class TicketCreateCommandHandler : CurrentMember, IRequestHandler<TicketCreateCommand, TicketResponseModel>
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IMemberRepository _memberRepository;
        public TicketCreateCommandHandler(IProjectRepository projectRepository,
            IMemberRepository memberRepository,
            ICurrentMemberProvider currentUserProvider
            ) : base(currentUserProvider)
        {
            _projectRepository = projectRepository;
            _memberRepository = memberRepository;
        }

        public async Task<TicketResponseModel> Handle(TicketCreateCommand request, CancellationToken cancellationToken)
        {
            var assigneeMember = await _memberRepository.GetSingleAsync(m => m.Id == request.TicketCreateModel.AssigneeId, cancellationToken);

            if (assigneeMember == null)
            {
                throw new NotFoundException("Assignee Not Found");
            }

            var project = await _projectRepository.GetSingleAsync(p => p.Id == request.TicketCreateModel.ProjectId,
                cancellationToken,
                p => p.Owner,
                p => p.Memberships);

            if (project == null)
            {
                throw new NotFoundException("Project Not Found");
            }

            if (!project.Memberships.Any(m => m.Id == CurrentMemberId))
            {
                throw new ForbiddenAccessException("You are not a member of this project");
            }

            var reporterMember = project.OwnerId == CurrentMemberId
                ? project.Owner
                : project.Memberships.First(m => m.Id == CurrentMemberId).Member;


            var ticket = new Ticket(request.TicketCreateModel.Name,
                               request.TicketCreateModel.Description,
                               request.TicketCreateModel.StartDate,
                               request.TicketCreateModel.DueDate,
                               request.TicketCreateModel.TicketPriority,
                               request.TicketCreateModel.TicketStatus,
                               assigneeMember,
                               reporterMember);

            project.AddTicket(ticket);

            await _projectRepository.SaveAsync(cancellationToken);

            return ticket.Adapt<TicketResponseModel>();
        }
    }
}
