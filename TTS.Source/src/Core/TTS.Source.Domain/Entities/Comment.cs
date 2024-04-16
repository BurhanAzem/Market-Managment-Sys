using Ardalis.GuardClauses;
using TTS.Source.Domain.Base;

namespace TTS.Source.Domain.Entities
{
    public class Comment : BaseAggregateRoot<Guid>
    {
        private Comment() {}

        public Comment(Member member, string content)
        {
            Guard.Against.Null(member, nameof(member));
            Guard.Against.NullOrWhiteSpace(content, nameof(content));

            Member = member;
            Content = content;
        }
        public Member Member { get; set; } = null!;
        public string Content { get; set; } = string.Empty;
        public Ticket Ticket { get; private set; } = null!;
        public Guid TicketId { get; private set; }
        public Guid MemberId { get; private set; }

        public void Update(string newContent)
        {
            Guard.Against.NullOrWhiteSpace(newContent, nameof(newContent));
            Content = newContent;
        }
    }
}
