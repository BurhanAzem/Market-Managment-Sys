using Microsoft.AspNetCore.Identity;
using TTS.Source.Application.Common.Contracts.Identity;

namespace TTS.Source.Persistance.RelationalDB.Identity
{
    public class ApplicationUser : IdentityUser<Guid>, IApplicationUser
    {
        internal ApplicationUser(string email, Guid memberId) : base(email)
        {
            Email = email;
            MemberId = memberId;
        }

        public Guid MemberId { get; private set; }
    }
}
