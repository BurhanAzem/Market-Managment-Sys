using Mapster;
using MediatR;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Models;
using TTS.Source.Application.Features.Projects.Models;
using TTS.Source.Application.Common.Exceptions;

namespace TTS.Source.Application.Features.Projects.Commands.Edit
{
    public record ProjectEditCommand(ProjectEditModel ProjectEditModel) : IRequest<ProjectResponseModel>;

    public class ProjectEditCommandHandler : CurrentMember, IRequestHandler<ProjectEditCommand, ProjectResponseModel>
    {
        private readonly IProjectRepository _projectRepository;
        public ProjectEditCommandHandler(IProjectRepository projectRepository, ICurrentMemberProvider currentUserProvider)
            : base(currentUserProvider)
        {
            _projectRepository = projectRepository;
        }
        public async Task<ProjectResponseModel> Handle(
            ProjectEditCommand request,
            CancellationToken cancellationToken)
        {
            var project = await _projectRepository.GetSingleAsync(p => p.Id == request.ProjectEditModel.ProjectId, cancellationToken, p => p.Owner);

            if (project == null)
            {
                throw new NotFoundException("Project not found.");
            }

            if (project.OwnerId != CurrentMemberId)
            {
                throw new UnauthorizedAccessException("You cannot edit this project");
            }

            project.Update(request.ProjectEditModel.Name ?? project.Name,
                request.ProjectEditModel.Description ?? project.Description,
                request.ProjectEditModel.StartDate ?? project.StartDate,
                request.ProjectEditModel.EndDate ?? project.EndDate,
                request.ProjectEditModel.ProjectStatus ?? project.ProjectStatus);

            var result = await _projectRepository.UpdateAsync(project, cancellationToken);

            return result.Adapt<ProjectResponseModel>();
        }
    }
}