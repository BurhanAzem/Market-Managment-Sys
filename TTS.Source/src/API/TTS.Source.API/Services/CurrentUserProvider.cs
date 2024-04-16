using System.Security.Claims;
using TTS.Source.Application.Common.Contracts.Identity;

namespace TTS.Source.API.Services
{
    public class CurrentUserProvider : ICurrentMemberProvider
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CurrentUserProvider(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }
/*
        public Guid GetCurrentUserGuid()
        {
            var user = _httpContextAccessor.HttpContext?.User;

            if (user is null)
            {
                throw new InvalidOperationException("This request does not have an authenticated user.");
            }

            return Guid.TryParse(user.FindFirstValue(ClaimTypes.NameIdentifier), out var userId) ? userId : throw new InvalidOperationException("Invalid userId");
        }
*/
        public Guid GetCurrentMemberId()
        {
            var user = _httpContextAccessor.HttpContext?.User;

            if (user is null)
            {
                throw new InvalidOperationException("This request does not have an authenticated user.");
            }

            return Guid.TryParse(user.FindFirstValue("MemberId"), out var memberId) ? memberId : throw new InvalidOperationException("Invalid memberId");
        }
    }
}
