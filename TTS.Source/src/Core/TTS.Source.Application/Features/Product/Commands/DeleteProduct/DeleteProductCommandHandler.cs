using MediatR;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Domain.Entities;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Models;

namespace TTS.Source.Application.Features.Identity.Commands.Register
{
    public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, BaseCommandResponse>
    {
        private readonly IUserIdentityService _userIdentity;
        private readonly IProductRepository _productRepository;

        public DeleteProductCommandHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<BaseCommandResponse> Handle(
            DeleteProductCommand request,
            CancellationToken cancellationToken)
        {
            await _productRepository.DeleteProduct(request.ProductId, cancellationToken);
            BaseCommandResponse response = new BaseCommandResponse(new Guid(), true, "Product Deleted successfully");
            return response;
        }
    }
}