using MediatR;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Domain.Entities;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Models;

namespace TTS.Source.Application.Features.Identity.Commands.Register
{
    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, BaseCommandResponse>
    {
        private readonly IUserIdentityService _userIdentity;
        private readonly IProductRepository _productRepository;

        public UpdateProductCommandHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<BaseCommandResponse> Handle(
            UpdateProductCommand request,
            CancellationToken cancellationToken)
        {
            await _productRepository.UpdateProduct(request.ProductDto, request.ProductId, cancellationToken);
            BaseCommandResponse response = new BaseCommandResponse(new Guid(), true, "Product Updated successfully");
            return response;
        }
    }
}