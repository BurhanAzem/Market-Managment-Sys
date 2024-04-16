using TTS.Source.Domain.Base;

namespace TTS.Source.Domain.Entities
{
    public class Member : BaseAggregateRoot<Guid>
    {
        private Member()
        {
        }
        public Member(string name)
        {
            Name = name;
        }
        public string Name { get; set; } = null!;
    }
}
