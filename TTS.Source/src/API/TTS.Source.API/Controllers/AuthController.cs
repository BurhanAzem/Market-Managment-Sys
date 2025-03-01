using EmailService;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Org.BouncyCastle.Asn1.Ocsp;
using TTS.Source.Application.Features.Identity.Commands.Login;
using TTS.Source.Application.Features.Identity.Commands.Register;
using TTS.Source.Application.Features.Identity.Models;

namespace TTS.Source.API.Features
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IEmailSender _emailSender;
        public AuthController(IMediator mediator,
            IEmailSender emailSender)
        {
            _mediator = mediator;
            _emailSender = emailSender;
        }


        [HttpPost]
        [Route(nameof(Register))]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register(
                    [FromBody] UserRegisterRequest request,
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


        // [HttpPost]
        // [Route(nameof(Login))]
        // public async Task<ActionResult<UserResponseModel>> Login(UserRequestModel userRequestModel)
        //    => await _mediator.Send(new UserLoginCommand(userRequestModel));


        // [HttpPost]
        // [Route(nameof(Register))]
        // public async Task<ActionResult<UserResponseModel>> Register(
        //     UserRegisterRequestModel userRegisterRequestModel)
        //    => await _mediator.Send(new UserRegisterCommand(userRegisterRequestModel));

        // [HttpPost]
        // [Route(nameof(ForgotPassword))]
        // public async Task<ActionResult<string>> ForgotPassword(
        //    ForgotPasswordModel forgotPasswordModel)
        // {
        //     var response = await _mediator.Send(new ForgotPasswordCommand(forgotPasswordModel));

        //     var callback = Url.Action(nameof(ResetPassword), "Identity" , new { response.Token, email = response.Email }, Request.Scheme);

        //     var message = new Message(new string[] { response.Email }, "Reset password ", callback!); 

        //     await _emailSender.SendEmailAsync(message);

        //     return "Reset password link has been sent to your email";
        // }

        // [HttpPut]
        // [Route(nameof(ResetPassword))]
        // public async Task<ActionResult<ResetPasswordResponseModel>> ResetPassword(
        //    ResetPasswordRequestModel resetPasswordRequestModel)
        //            => await _mediator.Send(new ResetPasswordCommand(resetPasswordRequestModel));



    }
}
