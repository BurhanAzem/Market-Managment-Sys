using EmailService;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Org.BouncyCastle.Asn1.Ocsp;
using TTS.Source.Application.Features.Identity.Commands.Login;
using TTS.Source.Application.Features.Identity.Commands.Register;
using TTS.Source.Application.Features.Identity.Models;
using Google.Apis.Auth;
using TTS.Source.Application.Features.Identity.Models;
using System.Security.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
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

        [HttpPost]
        [Route(nameof(Login))]
        public async Task<ActionResult<UserResponseModel>> LoginWithGoogle(UserLoginRequest request,
         CancellationToken cancellationToken)
        {
            var command = request.Adapt<UserLoginCommand>();
            var res = await _mediator.Send(command, cancellationToken);
            return Ok(res);
        }


        // [HttpPost("google-login")]
        // public async Task<ActionResult<UserResponseModel>> GoogleLogin(
        //     [FromBody] GoogleLoginRequest request,
        //     CancellationToken cancellationToken)
        // {
        // var command = new UserGoogleLoginCommand(request.TokenId, request.UserRole);
        // var result = await _mediator.Send(command, cancellationToken);
        // return Ok(result);
        // }

        [HttpGet("login/google")]
        public IActionResult LoginWithGoogle([FromQuery] string returnUrl = "/", [FromQuery] string role = "Customer")
        {
            var authProperties = new AuthenticationProperties
            {
                RedirectUri = Url.Action(nameof(GoogleCallback), new { returnUrl }),
                Items =
        {
            { "returnUrl", returnUrl },
            { "userRole", role }
        }
            };

            return Challenge(authProperties, GoogleDefaults.AuthenticationScheme);
        }

        // // 2) Google callback
        // [HttpGet("login/google-callback")]
        // public async Task<IActionResult> GoogleCallback([FromQuery] string returnUrl = "/")
        // {
        //     // 2a) Google has redirected to us with an auth code.
        //     var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        //     // If anything failed or user canceled:
        //     if (!result.Succeeded || result.Principal == null)
        //     {
        //         return Redirect($"{returnUrl}?error=GoogleAuthFailed");
        //     }

        //     // 2b) Pass the claims to your AccountService
        //     try
        //     {
        //         var command = new UserGoogleLoginCommand(result.Principal, request.UserRole);
        //         var result = await _mediator.Send(command, cancellationToken);
        //         return Ok(result);
        //         await _accountService.LoginWithGoogleAsync(result.Principal);
        //     }
        //     catch (Exception ex)
        //     {
        //         // Log or handle if needed
        //         Console.WriteLine($"Error logging in via Google: {ex.Message}");
        //         return Redirect($"{returnUrl}?error=GoogleAuthFailed");
        //     }

        //     // 2c) On success, redirect to front-end
        //     return Redirect(returnUrl);
        // }
        [HttpGet("login/google-callback")]
        public async Task<IActionResult> GoogleCallback([FromQuery] string returnUrl = "/")
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            if (!result.Succeeded || result.Principal == null)
            {
                return Redirect($"{returnUrl}?error=GoogleAuthFailed");
            }

            var role = result.Properties?.Items["userRole"] ?? "Customer";

            try
            {
                var command = new UserGoogleLoginCommand(result.Principal, role);
                var _result = await _mediator.Send(command, cancellationToken);
                return Ok(_result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Google login failed: {ex.Message}");
                return Redirect($"{returnUrl}?error=GoogleAuthFailed");
            }

            return Redirect(returnUrl);
        }



    }
}
