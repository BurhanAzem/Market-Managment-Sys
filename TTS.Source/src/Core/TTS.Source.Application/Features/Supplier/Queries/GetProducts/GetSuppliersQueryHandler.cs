using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TTS.Source.Application.Dtos;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Features.Identity.Models;

namespace TTS.Source.Application.Features.Projects.Queries
{


    public class GetSuppliersQueryHandler : IRequestHandler<GetSuppliersQuery, IList<SupplierDto>>
    {
        private readonly ISupplierRepository _supplierRepository;

        public GetSuppliersQueryHandler(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        public async Task<IList<SupplierDto>> Handle(GetSuppliersQuery request, CancellationToken cancellationToken)
        {
            var suppliers = await _supplierRepository.GetSuppliers(cancellationToken);
            var suppliersDto = suppliers
                .Select(s => new SupplierDto
                {
                    Id = s.Id,
                    // Name = s.Name,
                    Address = s.Address,
                    CreatedDate = s.CreatedDate,
                    Email = s.Email,
                    PhoneNumber = s.PhoneNumber
                })
                .ToList();

            return suppliersDto;
        }
    }
}
