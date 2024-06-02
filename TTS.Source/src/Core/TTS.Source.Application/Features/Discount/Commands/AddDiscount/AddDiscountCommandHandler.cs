using MediatR;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Domain.Entities;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Models;

namespace TTS.Source.Application.Features.Identity.Commands.Register
{
    public class AddDiscountCommandHandler : IRequestHandler<AddDiscountCommand, BaseCommandResponse>
    {
        private readonly IDiscountRepository _discountRepository;

        public AddDiscountCommandHandler(IDiscountRepository discountRepository)
        {
            _discountRepository = discountRepository;
        }

        public async Task<BaseCommandResponse> Handle(
            AddDiscountCommand request,
            CancellationToken cancellationToken)
        {
            var id = await _discountRepository.CreateDiscount(request.DiscountDto, cancellationToken);
            BaseCommandResponse response = new BaseCommandResponse(id, true, "Discount Created successfully");
            return response;
        }
    }
}