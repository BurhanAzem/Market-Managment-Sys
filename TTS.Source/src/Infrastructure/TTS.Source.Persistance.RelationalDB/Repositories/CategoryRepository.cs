using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Dtos;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Persistance.RelationalDB.Repositories
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        private readonly TTSDBContext _dbContext;
        public CategoryRepository(TTSDBContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> AddCategory(AddCategoryDto categoryDto, CancellationToken cancellationToken)
        {
            // Check if the product already exists
            var existingProduct = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Name == categoryDto.Name, cancellationToken);
            if (existingProduct != null)
            {
                throw new BadRequestException("This category already exists!");
            }

            var category = new Category
            {
                Name = categoryDto.Name,
                Description = categoryDto.Description
            };
            _dbContext.Categories.Add(category);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return category.Id;
        }


        public async Task<IList<Category>> GetCategories(CancellationToken cancellationToken)
        {
            var categories = await _dbContext.Categories.ToListAsync();
            return categories;
        }


    }
}
