using TTS.Source.Application.Dtos;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Common.Contracts.Persistance
{
    public interface IShelfRepository : IRepository<Shelf>
    {
        Task<IList<Shelf>> GetShelfs(CancellationToken cancellationToken);
        Task<Guid> AddShelf(AddShelfDto shelfDto, CancellationToken cancellationToken);

    }
}
