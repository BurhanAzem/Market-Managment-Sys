using TTS.Source.Application.Dtos;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Common.Contracts.Persistance
{
    public interface ISupplierRepository : IRepository<Supplier>
    {
        Task<IList<Supplier>> GetSuppliers(CancellationToken cancellationToken);
        Task<Guid> AddSupplier(AddSupplierDto supplierDto, CancellationToken cancellationToken);
    }
}
