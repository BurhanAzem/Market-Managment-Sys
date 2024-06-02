using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Dtos;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Persistance.RelationalDB.Repositories
{
    public class DiscountRepository : Repository<Discount>, IDiscountRepository
    {
        private readonly TTSDBContext _dbContext;
        public DiscountRepository(TTSDBContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> CreateDiscount(AddDiscountDto discountDto, CancellationToken cancellationToken)
        {
            // Check if the product already exists
            var existingDiscount = await _dbContext.Discounts.FirstOrDefaultAsync(d => d.Amount == discountDto.Amount
                                                                                   && d.StartDate == discountDto.StartDate
                                                                                   && d.EndDate == discountDto.EndDate, cancellationToken);
            if (existingDiscount != null)
            {
                throw new BadRequestException("This Discount already exists! You can update it.");
            }





            var discount = new Discount
            {
                Amount = discountDto.Amount,
                StartDate = discountDto.StartDate,
                EndDate = discountDto.EndDate,
            };

            // Add the product to the database
            _dbContext.Discounts.Add(discount);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return discount.Id;
        }

        public async Task DeleteDiscount(Guid discountId, CancellationToken cancellationToken)
        {
            var discount = await _dbContext.Discounts.FirstOrDefaultAsync(d => d.Id == discountId, cancellationToken);
            if (discount != null)
            {
                _dbContext.Discounts.Remove(discount);
                await _dbContext.SaveChangesAsync(cancellationToken);
            }
            else
            {
                throw new BadRequestException("discount not exist !");
            }
        }



        public async Task UpdateDiscount(UpdateDiscountDto discountDto, Guid discountId, CancellationToken cancellationToken)
        {
            var discount = await _dbContext.Discounts.FirstOrDefaultAsync(d => d.Id == discountId, cancellationToken);
            if (discount == null)
            {
                throw new BadRequestException("This Discount not exists!");
            }


            discount = new Discount
            {
                Amount = discountDto.Amount,
                StartDate = discountDto.StartDate,
                EndDate = discountDto.EndDate,
            };

            _dbContext.Discounts.Update(discount);
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
