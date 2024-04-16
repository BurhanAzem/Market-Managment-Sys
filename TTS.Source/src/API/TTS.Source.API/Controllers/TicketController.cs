using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TTS.Source.Application.Features.Comments.Commands.Create;
using TTS.Source.Application.Features.Comments.Commands.Delete;
using TTS.Source.Application.Features.Comments.Commands.Edit;
using TTS.Source.Application.Features.Comments.Models;
using TTS.Source.Application.Features.Projects.Commands.Edit;
using TTS.Source.Application.Features.Projects.Models;
using TTS.Source.Application.Features.Projects.Queries;
using TTS.Source.Application.Features.Tickets.Commands.Create;
using TTS.Source.Application.Features.Tickets.Commands.Edit;
using TTS.Source.Application.Features.Tickets.Models;
using TTS.Source.Application.Features.Tickets.Queries;

namespace TTS.Source.API.Features
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TicketController : ControllerBase
    {
        private readonly IMediator _mediator;
        public TicketController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Route(nameof(Create))]
        public async Task<ActionResult<TicketResponseModel>> Create(TicketCreateModel model)
           => await _mediator.Send(new TicketCreateCommand(model));

        [HttpPut]
        [Route(nameof(Edit))]
        public async Task<ActionResult<TicketResponseModel>> Edit(TicketEditModel model)
          => await _mediator.Send(new TicketEditCommand(model));


        [HttpPost]
        [Route(nameof(AddComment))]
        public async Task<ActionResult<CommentResponseModel>> AddComment(CommentCreateModel model)
           => await _mediator.Send(new CommentCreateCommand(model));

        [HttpPut]
        [Route(nameof(EditComment))]
        public async Task<ActionResult<CommentResponseModel>> EditComment(CommentEditModel model)
         => await _mediator.Send(new CommentEditCommand(model));


        [HttpDelete]
        [Route(nameof(DeleteComment))]
        public async Task<ActionResult<CommentResponseModel>> DeleteComment(CommentDeleteModel model)
         => await _mediator.Send(new CommentDeleteCommand(model));


        [HttpGet]
        [Route(nameof(GetTicketById))]
        public async Task<ActionResult<TicketResponseModel>> GetTicketById(Guid ticketId)
          => await _mediator.Send(new TicketByIdQuery(ticketId));

        [HttpGet]
        [Route(nameof(GetTicketsByProjectId))]
        public async Task<ActionResult<TicketsResponseModel>> GetTicketsByProjectId(Guid projectId)
          => await _mediator.Send(new TicketsByProjectIdQuery(projectId));

        [HttpGet]
        [Route(nameof(GetTicketsByAssignedMemberId))]
        public async Task<ActionResult<TicketsResponseModel>> GetTicketsByAssignedMemberId(Guid memberId)
          => await _mediator.Send(new TicketsByAssignedMemberIdQuery(memberId));

        [HttpGet]
        [Route(nameof(Search))]
        public async Task<ActionResult<TicketSearchResponseModel>> Search([FromQuery] TicketSearchModel model)
          => await _mediator.Send(new TicketSearchQuery(model));
    }
}
