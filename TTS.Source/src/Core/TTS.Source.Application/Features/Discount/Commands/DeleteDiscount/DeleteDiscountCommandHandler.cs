using MediatR;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Domain.Entities;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Models;

namespace TTS.Source.Application.Features.Identity.Commands.Register
{
    public class DeleteDiscountCommandHandler : IRequestHandler<DeleteDiscountCommand, BaseCommandResponse>
    {
        private readonly IUserIdentityService _userIdentity;
        private readonly IDiscountRepository _discountRepository;

        public DeleteDiscountCommandHandler(IDiscountRepository discountRepository)
        {
            _discountRepository = discountRepository;
        }

        public async Task<BaseCommandResponse> Handle(
            DeleteDiscountCommand request,
            CancellationToken cancellationToken)
        {
            await _discountRepository.DeleteDiscount(request.Discountd, cancellationToken);
            BaseCommandResponse response = new BaseCommandResponse(new Guid(), true, "Discount Deleted successfully");
            return response;
        }
    }
}