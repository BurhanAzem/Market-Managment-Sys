
using TTS.Source.Domain.Entities;

namespace TTS.Source.Persistance.RelationalDB.Identity.Services
{
    public interface IJwtGeneratorService
    {
        Task<string> GenerateToken(User user);
    }
}