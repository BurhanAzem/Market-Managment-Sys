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
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IEmailSender _emailSender;
        public ProductsController(IMediator mediator,
            IEmailSender emailSender)
        {
            _mediator = mediator;
            _emailSender = emailSender;
        }


        [HttpPost]
        // [Route(nameof(Register))]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddProduct(
                    [FromBody] AddProductRequest request,
                 CancellationToken cancellationToken)
        {
            var command = request.Adapt<AddProductCommand>();
            var res = await _mediator.Send(command, cancellationToken);
            return Ok(res);
        }

        [HttpDelete("{productId}")]
        // [Route(nameof(Register))]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid productId, CancellationToken cancellationToken)
        {
            var command = new DeleteProductCommand(productId);
            var res = await _mediator.Send(command, cancellationToken);
            return Ok(res);
        }


        [HttpPut("{productId}")]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateProduct(
       [FromBody] UpdateProductRequest request,
       [FromRoute] Guid productId,
       CancellationToken cancellationToken)
        {
            var command = new UpdateProductCommand(request.ProductDto, productId);
            var res = await _mediator.Send(command, cancellationToken);
            return Ok(res);
        }

        [HttpGet()]
        [ProducesResponseType(typeof(GetProductsResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetProductsByFilters(
                    [FromQuery] GetProductsQuery request,
                 CancellationToken cancellationToken)
        {
            var res = await _mediator.Send(request, cancellationToken);
            return Ok(res);
        }



    }
}
