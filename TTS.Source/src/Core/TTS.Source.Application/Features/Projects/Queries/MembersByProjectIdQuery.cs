using Mapster;
using MediatR;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Feature.Projects.Models;
using TTS.Source.Application.Features.Projects.Models;

namespace TTS.Source.Application.Features.Projects.Queries
{
    public record MembersByProjectIdQuery(Guid ProjectId) : IRequest<MembersResponseModel>;

    public class MembersByProjectIdQueryHandler : IRequestHandler<MembersByProjectIdQuery, MembersResponseModel>
    {
        private readonly IProjectMembershipRepository _projectMembershipRepository;
        private readonly IProjectRepository _projectRepository;

        public MembersByProjectIdQueryHandler(IProjectMembershipRepository projectMembershipRepository, IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
            _projectMembershipRepository = projectMembershipRepository;
        }

        public async Task<MembersResponseModel> Handle(MembersByProjectIdQuery request, CancellationToken cancellationToken)
        {
            var projectExists = await _projectRepository.ExistsAsync(p => p.Id == request.ProjectId, cancellationToken);

            if (!projectExists)
            {
                throw new NotFoundException("Project not found.");
            }

            var members = await _projectMembershipRepository.GetMembersByProjectId(request.ProjectId, cancellationToken);

            var membersResponse = members.Select(p => p.Adapt<MemberResponseModel>()).ToList();

            return new MembersResponseModel(membersResponse);
        }
    }
}

