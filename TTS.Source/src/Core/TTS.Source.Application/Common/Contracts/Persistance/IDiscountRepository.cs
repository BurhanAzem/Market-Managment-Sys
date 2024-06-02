using TTS.Source.Application.Dtos;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Common.Contracts.Persistance
{
    public interface IDiscountRepository : IRepository<Discount>
    {
        Task<Guid> CreateDiscount(AddDiscountDto discountDto, CancellationToken cancellationToken);
        Task UpdateDiscount(UpdateDiscountDto discountDto, Guid productId, CancellationToken cancellationToken);
        Task DeleteDiscount(Guid discountId, CancellationToken cancellationToken);

    }
}
