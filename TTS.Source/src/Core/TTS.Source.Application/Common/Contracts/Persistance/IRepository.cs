using System.Linq.Expressions;
using TTS.Source.Application.Common.Models;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Common.Contracts.Persistance
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken);
        Task<PaginatedList<TEntity>> GetPagedAsync(Expression<Func<TEntity, bool>> predicate,
            int pageNumber,
            int pageSize,
            params Expression<Func<TEntity, object>>[] includes);
        Task<TEntity?> GetSingleAsync(Expression<Func<TEntity, bool>> expression,
                CancellationToken cancellationToken,
                params Expression<Func<TEntity, object>>[] includes);
        Task<TEntity?> FindAsync(Guid Id, CancellationToken cancellationToken);
        Task<List<TEntity>> GetAsync(Expression<Func<TEntity, bool>> expression,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy,
            params Expression<Func<TEntity, object>>[] includes);
        Task<TEntity> AddAsync(TEntity entity, CancellationToken cancellationToken);
        Task<TEntity> UpdateAsync(TEntity entity, CancellationToken cancellationToken);
        Task<TEntity> DeleteAsync(TEntity entity, CancellationToken cancellationToken);
        Task SaveAsync(CancellationToken cancellationToken = default);
    }
}
