using System.Linq.Expressions;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Common.Contracts.Persistance
{
    public interface IProjectRepository : IRepository<Project>
    {
        Task<Project?> GetProject(Expression<Func<Project, bool>> predicate);
    }
}
