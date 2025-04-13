using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Dtos;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Persistance.RelationalDB.Repositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly TTSDBContext _dbContext;
        public ProductRepository(TTSDBContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> CreateProduct(AddProductDto productDto, CancellationToken cancellationToken)
        {
            // Check if the product already exists
            var existingProduct = await _dbContext.Products.FirstOrDefaultAsync(p => p.BarCode == productDto.BarCode, cancellationToken);
            if (existingProduct != null)
            {
                throw new BadRequestException("This product already exists! You can update it.");
            }


            Discount discount = new Discount();
            // Create a new discount
            if (productDto.DiscountDto != null)
            {
                discount.Amount = productDto.DiscountDto.Amount;
                discount.StartDate = productDto.DiscountDto.StartDate;
                discount.EndDate = productDto.DiscountDto.EndDate;
                _dbContext.Discounts.Add(discount);
                await _dbContext.SaveChangesAsync(cancellationToken);
            }


          
            var product = new Product
            {
                BarCode = productDto.BarCode,
                CategoryId = productDto.CategoryId,
                ShelfId = productDto.ShelfId,
                CreatedDate = DateTime.Now,
                CurrentRetailPurchasingPrice = productDto.CurrentRetailPurchasingPrice,
                CurrentRetailSellingPrice = productDto.CurrentRetailSellingPrice,
                CurrentWholeSalePurchasingPrice = productDto.CurrentWholeSalePurchasingPrice,
                Description = productDto.Description,
                CurrentWholeSalSellingPrice = productDto.CurrentWholeSalSellingPrice,
                Discount = discount,
                ImagePath = productDto.ImagePath,
                Name = productDto.Name,
                MinimumQuantityOfProductsPresentedForRetail = productDto.MinimumQuantityOfProductsPresentedForRetail,
                MinimumQuantityOfProductsPresentedForWholesale = productDto.MinimumQuantityOfProductsPresentedForWholesale,
                QuantityOfProductsPresentedForRetail = productDto.QuantityOfProductsPresentedForRetail,
                QuantityOfProductsPresentedForWholesale = productDto.QuantityOfProductsPresentedForWholesale,
            };

            // Add the product to the database
            _dbContext.Products.Add(product);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return product.Id;
        }

        public async Task DeleteProduct(Guid productId, CancellationToken cancellationToken)
        {
            var prod = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == productId, cancellationToken);
            if (prod != null)
            {
                _dbContext.Products.Remove(prod);
                await _dbContext.SaveChangesAsync(cancellationToken);
            }
            else
            {
                throw new BadRequestException("product not exist !!");
            }
        }

        public async Task<Product?> GetProductByBarCode(int barCode, CancellationToken cancellationToken)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.BarCode == barCode, cancellationToken);
            if (product == null)
            {
                throw new BadRequestException("product not exist !");

            }
            return product;
        }

        public async Task<Product?> GetProductById(Guid productId, CancellationToken cancellationToken)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == productId, cancellationToken);
            if (product == null)
            {
                throw new BadRequestException("product not exist !");

            }
            return product;
        }

        public async Task UpdateProduct(UpdateProductDto productDto, Guid productId, CancellationToken cancellationToken)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == productId, cancellationToken);
            if (product == null)
            {
                throw new BadRequestException("This product not exists!");
            }




            product.BarCode = (double)(productDto.BarCode != null ? productDto.BarCode : product.BarCode);

            product.CategoryId = productDto.CategoryId != null ? productDto.CategoryId : product.CategoryId;
            product.ShelfId = productDto.ShelfId != null ? productDto.ShelfId : product.ShelfId;
            product.CurrentRetailPurchasingPrice = productDto.CurrentRetailPurchasingPrice != null ? productDto.CurrentRetailPurchasingPrice : product.CurrentRetailPurchasingPrice;
            product.CurrentRetailSellingPrice = (decimal)(productDto.CurrentRetailSellingPrice != null ? productDto.CurrentRetailSellingPrice : product.CurrentRetailSellingPrice);
            product.CurrentWholeSalePurchasingPrice = productDto.CurrentWholeSalePurchasingPrice != null ? productDto.CurrentWholeSalePurchasingPrice : product.CurrentWholeSalePurchasingPrice;
            product.Description = productDto.Description != null ? productDto.Description : product.Description;
            product.CurrentWholeSalSellingPrice = productDto.CurrentWholeSalSellingPrice != null ? productDto.CurrentWholeSalSellingPrice : product.CurrentWholeSalSellingPrice;
            product.Discount = productDto.DiscountDto != null ? new Discount
            {
                Amount = productDto.DiscountDto.Amount,
                StartDate = productDto.DiscountDto.StartDate,
                EndDate = productDto.DiscountDto.EndDate
            } : product.Discount;

            product.ImagePath = productDto.ImagePath != null ? productDto.ImagePath : product.ImagePath;
            product.Name = productDto.Name != null ? productDto.Name : product.Name;
            product.MinimumQuantityOfProductsPresentedForRetail = (int)(productDto.MinimumQuantityOfProductsPresentedForRetail != null ? productDto.MinimumQuantityOfProductsPresentedForRetail : product.MinimumQuantityOfProductsPresentedForRetail);
            product.MinimumQuantityOfProductsPresentedForWholesale = productDto.MinimumQuantityOfProductsPresentedForWholesale != null ? productDto.MinimumQuantityOfProductsPresentedForWholesale : product.MinimumQuantityOfProductsPresentedForWholesale;
            product.QuantityOfProductsPresentedForRetail = (int)(productDto.QuantityOfProductsPresentedForRetail != null ? productDto.QuantityOfProductsPresentedForRetail : product.QuantityOfProductsPresentedForRetail);
            product.QuantityOfProductsPresentedForWholesale = productDto.QuantityOfProductsPresentedForWholesale != null ? productDto.QuantityOfProductsPresentedForWholesale : product.QuantityOfProductsPresentedForWholesale;

            _dbContext.Products.Update(product);
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
