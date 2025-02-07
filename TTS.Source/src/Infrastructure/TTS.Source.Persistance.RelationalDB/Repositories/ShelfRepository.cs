using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Dtos;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Persistance.RelationalDB.Repositories
{
    public class ShelfRepository : Repository<Shelf>, IShelfRepository
    {
        private readonly TTSDBContext _dbContext;
        public ShelfRepository(TTSDBContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

       public async Task<Guid> AddShelf(AddShelfDto shelfDto, CancellationToken cancellationToken)
        {
            // Check if the product already exists
            var shelf = await _dbContext.Shelfs.FirstOrDefaultAsync(s => s.ShelfCode == shelfDto.ShelfCode, cancellationToken);
            if (shelf != null)
            {
                throw new BadRequestException("This shelf already exists!");
            }

            var newShelf = new Shelf
            {
                ShelfCode = shelfDto.ShelfCode,
            };
            _dbContext.Shelfs.Add(newShelf);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return newShelf.Id;
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
                throw new BadRequestException("product not exist !");
            }
        }

        public async Task<IList<Shelf>> GetShelfs(CancellationToken cancellationToken)
        {
              var shelfs = await _dbContext.Shelfs.ToListAsync();
            return shelfs;
        }


    }
}
