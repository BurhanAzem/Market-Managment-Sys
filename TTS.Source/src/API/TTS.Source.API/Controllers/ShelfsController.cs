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
    public class ShelfsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ShelfsController(IMediator mediator)
        {
            _mediator = mediator;
        }



        [HttpPost]
        // [Route(nameof(Register))]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddShelf(
                    [FromBody] AddShelfCommand request,
                 CancellationToken cancellationToken)
        {
            var res = await _mediator.Send(request, cancellationToken);
            return Ok(res);
        }

        [HttpGet()]
        [ProducesResponseType(typeof(GetProductsResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetShelfs(
                    [FromQuery] GetShelfsQuery request,
                 CancellationToken cancellationToken)
        {
            var res = await _mediator.Send(request, cancellationToken);
            return Ok(res);
        }


    }
}

