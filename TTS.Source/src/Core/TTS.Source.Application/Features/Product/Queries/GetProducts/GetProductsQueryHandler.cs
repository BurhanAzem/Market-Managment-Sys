using Mapster;
using MediatR;
using System.Linq.Expressions;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Models;
using TTS.Source.Application.Dtos;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Application.Features.Projects.Queries
{
    // public record ProjectSearchQuery(ProjectSearchModel ProjectSearchModel) : IRequest<GetProductsResponse>;

    public class GetProductsQueryHandler : CurrentMember, IRequestHandler<GetProductsQuery, GetProductsResponse>
    {
        private readonly IProductRepository _productRepository;
        public GetProductsQueryHandler(IProductRepository productRepository, ICurrentMemberProvider currentUserProvider)
            : base(currentUserProvider)
        {
            _productRepository = productRepository;
        }

        public async Task<GetProductsResponse> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
            Expression<Func<Product, bool>> predicate = p =>
                (string.IsNullOrEmpty(request.ProductName) || p.Name.Contains(request.ProductName)) &&
                (string.IsNullOrEmpty(request.CategoryName) || p.Category.Name.Contains(request.CategoryName)) &&
                (string.IsNullOrEmpty(request.SupplierName) || p.Supplier.Name.Contains(request.SupplierName)) &&
                (string.IsNullOrEmpty(request.SelfCode) || p.Shelf.ShelfCode.Contains(request.SelfCode));
            // (p.OwnerId == CurrentMemberId || p.Memberships.Any(m => m.Member.Id == CurrentMemberId)


            var paginatedProducts = await _productRepository.GetPagedAsync(
    predicate,
    request.PageNumber,
    request.PageSize,
    p => p.Category,
    p => p.Discount,
    p => p.Shelf
);

            var productsDtos = paginatedProducts.Items
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    CategoryId = p.CategoryId,
                    ShelfId = p.ShelfId,
                    SupplierId = p.SupplierId,
                    DiscountDto = p.Discount?.Adapt<DiscountDto>(), // Assuming Adapt method is used for mapping
                    CategoryDto = p.Category?.Adapt<CategoryDto>(), // Assuming Adapt method is used for mapping
                    ShelfDto = p.Shelf?.Adapt<ShelfDto>(), // Assuming Adapt method is used for mapping
                    Name = p.Name,
                    Description = p.Description,
                    ImagePath = p.ImagePath,
                    BarCode = p.BarCode,
                    CurrentWholeSalePurchasingPrice = p.CurrentWholeSalePurchasingPrice,
                    CurrentWholeSalSellingPrice = p.CurrentWholeSalSellingPrice,
                    CurrentRetailPurchasingPrice = p.CurrentRetailPurchasingPrice,
                    CurrentRetailSellingPrice = p.CurrentRetailSellingPrice,
                    QuantityOfProductsPresentedForRetail = p.QuantityOfProductsPresentedForRetail,
                    QuantityOfProductsPresentedForWholesale = p.QuantityOfProductsPresentedForWholesale,
                    MinimumQuantityOfProductsPresentedForRetail = p.MinimumQuantityOfProductsPresentedForRetail,
                    MinimumQuantityOfProductsPresentedForWholesale = p.MinimumQuantityOfProductsPresentedForWholesale
                })
                .ToList();

            var getProductsResponse = new GetProductsResponse(
                productsDtos,
                paginatedProducts.PageNumber,
                paginatedProducts.TotalPages
            );

            return getProductsResponse;

        }


    }
}
