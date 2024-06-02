using MediatR;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Domain.Entities;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Models;

namespace TTS.Source.Application.Features.Identity.Commands.Register
{
    public class UpdateDiscountCommandHandler : IRequestHandler<UpdateDiscountCommand, BaseCommandResponse>
    {
        private readonly IUserIdentityService _userIdentity;
        private readonly IDiscountRepository _discountRepository;

        public UpdateDiscountCommandHandler(IDiscountRepository discountRepository)
        {
            _discountRepository = discountRepository;
        }

        public async Task<BaseCommandResponse> Handle(
            UpdateDiscountCommand request,
            CancellationToken cancellationToken)
        {
            await _discountRepository.UpdateDiscount(request.DiscountDto, request.DiscountId, cancellationToken);
            BaseCommandResponse response = new BaseCommandResponse(new Guid(), true, "Product Updated successfully");
            return response;
        }
    }
}