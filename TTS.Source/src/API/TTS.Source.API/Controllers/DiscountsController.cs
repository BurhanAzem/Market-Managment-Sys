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
    public class DiscountsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public DiscountsController(IMediator mediator)
        {
            _mediator = mediator;
        }




        [HttpPost]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddDiscount(
                    [FromBody] AddDiscountCommand request,
                 CancellationToken cancellationToken)
        {
            var res = await _mediator.Send(request, cancellationToken);
            return Ok(res);
        }

        [HttpDelete("{discountId}")]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteDiscount([FromRoute] Guid discountId, CancellationToken cancellationToken)
        {
            var command = new DeleteDiscountCommand(discountId);
            var res = await _mediator.Send(command, cancellationToken);
            return Ok(res);
        }


        [HttpPut("{discountId}")]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateDiscount(
       [FromBody] UpdateDiscountRequest request,
       [FromRoute] Guid discountId,
       CancellationToken cancellationToken)
        {
            var command = new UpdateDiscountCommand(request.DiscountDto, discountId);
            var res = await _mediator.Send(command, cancellationToken);
            return Ok(res);
        }


    }
}
