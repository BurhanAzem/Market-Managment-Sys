using Ardalis.GuardClauses;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Domain.Entities
{
    public class ProjectMembership : BaseAggregateRoot<Guid>
    {
        private ProjectMembership() { }
        private ProjectMembership(Project project, Member member)
        {
            Guard.Against.Null(project, nameof(project));
            Guard.Against.Null(member, nameof(member));

            Project = project;
            Member = member;
        }

        public Project Project { get; private set; } = null!;
        public Guid ProjectId { get; set; }
        public Member Member { get; private set; } = null!;
        public Guid MemberId { get; set; }
        public static ProjectMembership AddMember(Project project, Member member) => new ProjectMembership(project, member);

    }
}
