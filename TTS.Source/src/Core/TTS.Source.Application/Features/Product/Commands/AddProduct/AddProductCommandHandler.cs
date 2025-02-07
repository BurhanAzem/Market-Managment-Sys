using MediatR;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Domain.Entities;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Models;

namespace TTS.Source.Application.Features.Identity.Commands.Register
{
    public class AddProductCommandHandler : IRequestHandler<AddProductCommand, BaseCommandResponse>
    {
        private readonly IUserIdentityService _userIdentity;
        private readonly IProductRepository _productRepository;

        public AddProductCommandHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<BaseCommandResponse> Handle(
            AddProductCommand request,
            CancellationToken cancellationToken)
        {
            var id = await _productRepository.CreateProduct(request.ProductDto, cancellationToken);
            BaseCommandResponse response = new BaseCommandResponse(id, true, "Product Created successfully");
            return response;
        }
    }
}