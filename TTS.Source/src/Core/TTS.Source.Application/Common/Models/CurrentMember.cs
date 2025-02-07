using TTS.Source.Application.Common.Contracts.Identity;

namespace TTS.Source.Application.Common.Models
{
    public abstract class CurrentMember
    {
        protected readonly ICurrentMemberProvider _currentUserProvider;

        public CurrentMember(ICurrentMemberProvider currentUserProvider)
        {
            _currentUserProvider = currentUserProvider;
        }
        public Guid CurrentMemberId => _currentUserProvider.GetCurrentMemberId();
    }
}
