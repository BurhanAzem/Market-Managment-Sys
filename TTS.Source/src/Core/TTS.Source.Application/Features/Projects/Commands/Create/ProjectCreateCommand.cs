using Mapster;
using MediatR;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Common.Models;
using TTS.Source.Application.Features.Projects.Models;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Features.Projects.Commands.Create
{
    public record ProjectCreateCommand(ProjectCreateModel ProjectCreateModel) : IRequest<ProjectResponseModel>;

    public class ProjectCreateCommandHandler : CurrentMember, IRequestHandler<ProjectCreateCommand, ProjectResponseModel>
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IMemberRepository _memberRepository;
        public ProjectCreateCommandHandler(IProjectRepository projectRepository,
            ICurrentMemberProvider currentUserProvider,
            IMemberRepository memberRepository)
            : base(currentUserProvider)
        {
            _projectRepository = projectRepository;
            _memberRepository = memberRepository;
        }

        public async Task<ProjectResponseModel> Handle(
            ProjectCreateCommand request,
            CancellationToken cancellationToken)
        {
            var member = await _memberRepository.FindAsync(CurrentMemberId, cancellationToken);

            if (member == null)
            {
                   throw new NotFoundException("You're not a member");
            }

            var project = new Project(request.ProjectCreateModel.Name,
                request.ProjectCreateModel.Description,
                request.ProjectCreateModel.StartDate,
                request.ProjectCreateModel.EndDate,
                request.ProjectCreateModel.ProjectStatus,
                member);

            var result = await _projectRepository.AddAsync(project,cancellationToken);
            await _projectRepository.SaveAsync(cancellationToken);

            return result.Adapt<ProjectResponseModel>();
        }
    }
}
