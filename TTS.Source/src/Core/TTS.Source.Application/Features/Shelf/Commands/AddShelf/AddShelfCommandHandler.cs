using MediatR;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Domain.Entities;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Models;

namespace TTS.Source.Application.Features.Identity.Commands.Register
{
    public class AddShelfCommandHandler : IRequestHandler<AddShelfCommand, BaseCommandResponse>
    {
        private readonly IUserIdentityService _userIdentity;
        private readonly IShelfRepository _shelfRepository;

        public AddShelfCommandHandler(IShelfRepository shelfRepository)
        {
            _shelfRepository = shelfRepository;
        }

        public async Task<BaseCommandResponse> Handle(
            AddShelfCommand request,
            CancellationToken cancellationToken)
        {
            var id = await _shelfRepository.AddShelf(request.ShelfDto, cancellationToken);
            BaseCommandResponse response = new BaseCommandResponse(id, true, "Shelf Added successfully");
            return response;
        }
    }
}