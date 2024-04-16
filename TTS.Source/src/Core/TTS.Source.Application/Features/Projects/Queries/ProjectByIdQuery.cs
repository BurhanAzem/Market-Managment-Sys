using Mapster;
using MediatR;
using System.Linq.Expressions;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Common.Models;
using TTS.Source.Application.Features.Projects.Models;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Features.Projects.Queries
{
    public record ProjectByIdQuery(Guid ProjectId) : IRequest<ProjectMembersResponseModel>;

    public class ProjectByIdQueryHandler : CurrentMember, IRequestHandler<ProjectByIdQuery, ProjectMembersResponseModel>
    {
        private readonly IProjectRepository _projectRepository;
        public ProjectByIdQueryHandler(IProjectRepository projectRepository, ICurrentMemberProvider currentUserProvider)
            : base(currentUserProvider)
        {
            _projectRepository = projectRepository;
        }

        public async Task<ProjectMembersResponseModel> Handle(ProjectByIdQuery request, CancellationToken cancellationToken)
        {
            Expression<Func<Project, bool>> predicate = p => p.Id == request.ProjectId && p.Memberships.Any(m => m.Member.Id == CurrentMemberId);
            var project = await _projectRepository.GetProject(predicate);

            if (project == null)
            {
                throw new NotFoundException("Project not found.");
            }

            return project.Adapt<ProjectMembersResponseModel>();
        }
    }
}
