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
    public class EmployeesController : ApiController
    {
        private readonly IMediator _mediator;
        private readonly IEmailSender _emailSender;
        public EmployeesController(IMediator mediator,
            IEmailSender emailSender)
        {
            _mediator = mediator;
            _emailSender = emailSender;
        }


        
    }
}
