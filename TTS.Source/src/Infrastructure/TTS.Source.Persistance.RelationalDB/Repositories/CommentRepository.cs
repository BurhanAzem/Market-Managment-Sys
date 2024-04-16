using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Persistance.RelationalDB.Repositories
{
    public class CommentRepository : Repository<Comment>, ICommentRepository
    {
        private readonly TTSDBContext _dbContext;
        public CommentRepository(TTSDBContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
