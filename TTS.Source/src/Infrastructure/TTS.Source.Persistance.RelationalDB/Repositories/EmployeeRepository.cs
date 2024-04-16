using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Persistance.RelationalDB.Repositories
{
    public class EmployeeRepository : Repository<Employee>, IEmployeeRepository
    {
        private readonly TTSDBContext _dbContext;
        public EmployeeRepository(TTSDBContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
