using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Persistance.RelationalDB.Repositories
{
    public class MemberRepository : Repository<Member>, IMemberRepository
    {
        private readonly TTSDBContext _dbContext;
        public MemberRepository(TTSDBContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
