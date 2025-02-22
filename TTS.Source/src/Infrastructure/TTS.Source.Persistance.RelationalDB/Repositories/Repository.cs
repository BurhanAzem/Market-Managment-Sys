using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Models;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Persistance.RelationalDB.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity>  where TEntity : class
    {
        private readonly TTSDBContext _dbContext;
        private DbSet<TEntity> _dbSet;

        public Repository(TTSDBContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = dbContext.Set<TEntity>();
        }

        public async Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken)
        {
            return await _dbSet.AnyAsync(predicate, cancellationToken);
        }

        public async Task<PaginatedList<TEntity>> GetPagedAsync(Expression<Func<TEntity, bool>> predicate,
            int pageNumber,
            int pageSize,
            params Expression<Func<TEntity, object>>[] includes)
        {
            var queryable = _dbSet.Where(predicate);

            foreach (var include in includes)
            {
                queryable = queryable.Include(include);
            }

            return await PaginatedList<TEntity>.CreateAsync(queryable, pageNumber, pageSize);
        }

        public async Task<TEntity?> GetSingleAsync(Expression<Func<TEntity, bool>> expression,
            CancellationToken cancellationToken,
            params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = _dbSet;

            query = includes.Aggregate(query, (current, includeProperty) => current.Include(includeProperty));

            return await query.SingleOrDefaultAsync(expression, cancellationToken);
        }

        public virtual async Task<TEntity?> FindAsync(Guid Id, CancellationToken cancellationToken)
        {
            return await _dbSet.FindAsync(Id, cancellationToken);
        }

        public virtual async Task<List<TEntity>> GetAsync(Expression<Func<TEntity, bool>> expression,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy,
            params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = _dbSet;

            if (expression != null)
            {
                query = query.Where(expression);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            query = includes.Aggregate(query, (current, includeProperty) => current.Include(includeProperty));

            return await query.ToListAsync();
        }


        public virtual async Task<TEntity> AddAsync(TEntity entity, CancellationToken cancellationToken)
        {
            var result = await _dbSet.AddAsync(entity);
            return result.Entity;
        }

        public virtual async Task<TEntity> UpdateAsync(TEntity entity, CancellationToken cancellationToken)
        {
            _dbSet.Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync(cancellationToken);
            return entity;
        }

        public virtual async Task<TEntity> DeleteAsync(TEntity entity, CancellationToken cancellationToken)
        {
            _dbSet.Remove(entity);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return entity;
        }

        public virtual async Task SaveAsync(CancellationToken cancellationToken)
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
