using TTS.Source.Application.Dtos;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Common.Contracts.Persistance
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<IList<Category>> GetCategories(CancellationToken cancellationToken);
        Task<Guid> AddCategory(AddCategoryDto categoryDto, CancellationToken cancellationToken);
    }
}
