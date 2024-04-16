using EmailService;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Org.BouncyCastle.Asn1.Ocsp;
using Presentation.Controllers;
using TTS.Source.Application.Features.Identity.Commands.Login;
using TTS.Source.Application.Features.Identity.Commands.Register;
using TTS.Source.Application.Features.Identity.Models;

namespace TTS.Source.API.Features
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ApiController
    {
        private readonly IMediator _mediator;
        private readonly IEmailSender _emailSender;
        public EmployeeController(IMediator mediator,
            IEmailSender emailSender)
        {
            _mediator = mediator;
            _emailSender = emailSender;
        }


        [HttpPost]
        // [Route(nameof(Register))]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register(
            [FromBody] EmployeeRegisterRequest request,
         CancellationToken cancellationToken)
        {
            var command = request.Adapt<UserRegisterCommand>();
            var res = await _mediator.Send(command, cancellationToken);
            return Ok(res);
        }


        [HttpPost]
        [Route(nameof(Login))]
        public async Task<ActionResult<UserResponseModel>> Login(UserLoginRequest request,
         CancellationToken cancellationToken)
        {
            var command = request.Adapt<UserLoginCommand>();
            var res = await _mediator.Send(command, cancellationToken);
            return Ok(res);
        }

    }
}
