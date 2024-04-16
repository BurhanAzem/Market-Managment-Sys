// using Mapster;
// using MediatR;
// using TTS.Source.Application.Common.Contracts.Identity;
// using TTS.Source.Application.Common.Contracts.Persistance;
// using TTS.Source.Application.Common.Exceptions;
// using TTS.Source.Application.Common.Models;
// using TTS.Source.Application.Features.Projects.Models;

// namespace TTS.Source.Application.Features.Projects.Commands.AddMemberToProject
// {
//     public record AddMemberToProjectCommand(AddMemberToProjectModel AddMemberToProjectModel) : IRequest<AddMemberToProjectModel>;

//     public class AddMemberToProjectCommandHandler : CurrentMember, IRequestHandler<AddMemberToProjectCommand, AddMemberToProjectModel>
//     {
//         private readonly IProjectRepository _projectRepository;
//         private readonly IMemberRepository _memberRepository;
//         private readonly IUserIdentityService _userIdentity;
//         public AddMemberToProjectCommandHandler(IProjectRepository projectRepository,
//             ICurrentMemberProvider currentUserProvider,
//             IMemberRepository memberRepository,
//             IUserIdentityService userIdentity)
//             : base(currentUserProvider)
//         {
//             _projectRepository = projectRepository;
//             _memberRepository = memberRepository;
//             _userIdentity = userIdentity;
//         }

//         public async Task<AddMemberToProjectModel> Handle(
//             AddMemberToProjectCommand request,
//             CancellationToken cancellationToken)
//         {
//             var user = await _userIdentity.GetUserByEmailAddressAsync(request.AddMemberToProjectModel.Email);
//             if (user == null)
//             {
//                 throw new BadRequestException("User Not found");
//             }

//             var project = await _projectRepository.GetSingleAsync(p => p.Id == request.AddMemberToProjectModel.ProjectId, cancellationToken,
//                 p => p.Memberships);

//             if (project == null)
//             {
//                 throw new NotFoundException("Project not found.");
//             }

//             if (project.OwnerId != CurrentMemberId)
//             {
//                 throw new UnauthorizedAccessException("You cannot add member to this project");
//             }

//             var member = await _memberRepository.FindAsync(user.MemberId, cancellationToken);
//             if (member == null)
//             {
//                 throw new NotFoundException("Member not found.");
//             }
//             project.AddMember(member);
//             await _projectRepository.UpdateAsync(project, cancellationToken);
//             await _projectRepository.SaveAsync(cancellationToken);
//             return request.AddMemberToProjectModel;

//         }
//     }
// }
