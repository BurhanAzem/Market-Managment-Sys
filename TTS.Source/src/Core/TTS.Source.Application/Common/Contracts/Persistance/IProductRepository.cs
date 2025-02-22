using TTS.Source.Application.Dtos;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Common.Contracts.Persistance
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<Product?> GetProductById(Guid productId, CancellationToken cancellationToken);
        Task<Product?> GetProductByBarCode(int barCode, CancellationToken cancellationToken);
        Task<Guid> CreateProduct(AddProductDto productDto, CancellationToken cancellationToken);
        Task UpdateProduct(UpdateProductDto productDto, Guid productId, CancellationToken cancellationToken);
        Task DeleteProduct(Guid productId, CancellationToken cancellationToken);
        // Task<List<Product>> GetAllProducts(Guid projectId, CancellationToken cancellationToken);

    }
}
