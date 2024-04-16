using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
// using TTS.Source.Application.Features.Projects.Commands.AddMemberToProject;
using TTS.Source.Application.Features.Projects.Commands.Create;
using TTS.Source.Application.Features.Projects.Commands.Edit;
using TTS.Source.Application.Features.Projects.Models;
using TTS.Source.Application.Features.Projects.Queries;
using TTS.Source.Application.Feature.Projects.Models;

namespace TTS.Source.API.Features
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProjectController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProjectController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Route(nameof(GetProjectById))]
        public async Task<ActionResult<ProjectMembersResponseModel>> GetProjectById(Guid projectId)
          => await _mediator.Send(new ProjectByIdQuery(projectId));

        [HttpGet]
        [Route(nameof(Search))]
        public async Task<ActionResult<ProjectSearchResponseModel>> Search([FromQuery] ProjectSearchModel model)
           => await _mediator.Send(new ProjectSearchQuery(model));

        [HttpPost]
        [Route(nameof(Create))]
        public async Task<ActionResult<ProjectResponseModel>> Create(ProjectCreateModel model)
           => await _mediator.Send(new ProjectCreateCommand(model));

      //   [HttpPost]
      //   [Route(nameof(AddMemberToProject))]
      //   public async Task<ActionResult<AddMemberToProjectModel>> AddMemberToProject(AddMemberToProjectModel model)
      //      => await _mediator.Send(new AddMemberToProjectCommand(model));

        [HttpPut]
        [Route(nameof(Edit))]
        public async Task<ActionResult<ProjectResponseModel>> Edit(ProjectEditModel model)
           => await _mediator.Send(new ProjectEditCommand(model));

        [HttpGet]
        [Route(nameof(GetMembersByProjectId))]
        public async Task<ActionResult<MembersResponseModel>> GetMembersByProjectId(Guid projectId)
          => await _mediator.Send(new MembersByProjectIdQuery(projectId));
    }
}
