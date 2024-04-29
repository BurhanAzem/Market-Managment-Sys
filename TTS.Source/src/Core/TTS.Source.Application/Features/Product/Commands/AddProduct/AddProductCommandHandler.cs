using MediatR;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Domain.Entities;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Common.Contracts.Persistance;

namespace TTS.Source.Application.Features.Identity.Commands.Register
{
    public class AddProductCommandHandler : IRequestHandler<AddProductCommand, AddProductResponse>
    {
        private readonly IUserIdentityService _userIdentity;
        private readonly IProductRepository _productRepository;

        public AddProductCommandHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<AddProductResponse> Handle(
            AddProductCommand request,
            CancellationToken cancellationToken)
        {
            var id = await _productRepository.CreateProduct(request.ProductDto, cancellationToken);
            AddProductResponse response = new AddProductResponse(id, true, "Product Created successfully");
            return response;
        }
    }
}