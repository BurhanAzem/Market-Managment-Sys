using Mapster;
using MediatR;
using System.Linq.Expressions;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Models;
using TTS.Source.Application.Features.Projects.Models;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Application.Features.Projects.Queries
{
    public record ProjectSearchQuery(ProjectSearchModel ProjectSearchModel) : IRequest<ProjectSearchResponseModel>;

    public class ProjectsSearchQueryHandler : CurrentMember, IRequestHandler<ProjectSearchQuery, ProjectSearchResponseModel>
    {
        private readonly IProjectRepository _projectRepository;
        public ProjectsSearchQueryHandler(IProjectRepository projectRepository, ICurrentMemberProvider currentUserProvider)
            : base(currentUserProvider)
        {
            _projectRepository = projectRepository;
        }

        public async Task<ProjectSearchResponseModel> Handle(ProjectSearchQuery request, CancellationToken cancellationToken)
        {
            Expression<Func<Project, bool>> predicate = p =>
                (string.IsNullOrEmpty(request.ProjectSearchModel.ProjectName) || p.Name.Contains(request.ProjectSearchModel.ProjectName)) &&
                (request.ProjectSearchModel.StartDate == null || p.StartDate >= request.ProjectSearchModel.StartDate) &&
                (request.ProjectSearchModel.EndDate == null || p.EndDate <= request.ProjectSearchModel.EndDate) &&
                (request.ProjectSearchModel.Status == null || p.ProjectStatus == request.ProjectSearchModel.Status) &&
                (p.OwnerId == CurrentMemberId || p.Memberships.Any(m => m.Member.Id == CurrentMemberId));

            var paginatedProjects = await _projectRepository.GetPagedAsync(
                predicate,
                request.ProjectSearchModel.PageNumber,
                request.ProjectSearchModel.PageSize,
                p => p.Owner
            );

            var projectResponseModels = paginatedProjects.Items.Select(p => p.Adapt<ProjectResponseModel>()).ToList();
            var projectSearchResponseModel = new ProjectSearchResponseModel(
                projectResponseModels,
                paginatedProjects.PageNumber,
                paginatedProjects.TotalPages
            );

            return projectSearchResponseModel;
        }
    }
}
