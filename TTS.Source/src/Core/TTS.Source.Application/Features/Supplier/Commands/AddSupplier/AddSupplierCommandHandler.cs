using MediatR;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Domain.Entities;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Models;

namespace TTS.Source.Application.Features.Identity.Commands.Register
{
    public class AddSupplierCommandHandler : IRequestHandler<AddSupplierCommand, BaseCommandResponse>
    {
        private readonly IUserIdentityService _userIdentity;
        private readonly ISupplierRepository _supplierRepository;

        public AddSupplierCommandHandler(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        public async Task<BaseCommandResponse> Handle(
            AddSupplierCommand request,
            CancellationToken cancellationToken)
        {
            var id = await _supplierRepository.AddSupplier(request.SupplierDto, cancellationToken);
            BaseCommandResponse response = new BaseCommandResponse(id, true, "Supplier Added successfully");
            return response;
        }
    }
}