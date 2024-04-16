using Ardalis.GuardClauses;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Domain.Entities
{
    public class Project : BaseAggregateRoot<Guid>
    {
        private Project() { }

        public Project(string name,
            string description,
            DateOnly startDate,
            DateOnly endDate,
            ProjectStatus projectStatus,
            Member member)
        {
            Guard.Against.NullOrWhiteSpace(name, nameof(name));
            Guard.Against.Null(startDate, nameof(startDate));
            Guard.Against.Null(endDate, nameof(endDate));
            Guard.Against.OutOfRange(endDate, nameof(endDate), startDate.AddDays(1), DateOnly.MaxValue);
            Guard.Against.EnumOutOfRange(projectStatus);
            Guard.Against.Null(member, nameof(member));

            Name = name;
            Description = description;
            StartDate = startDate;
            EndDate = endDate;
            ProjectStatus = projectStatus;
            SetOwner(member);
        }

        public string Name { get; private set; } = null!;
        public string? Description { get; private set; }
        public DateOnly StartDate { get; private set; }
        public DateOnly EndDate { get; private set; }
        public ProjectStatus ProjectStatus { get; private set; }
        public Member Owner { get; private set; } = null!;
        public Guid OwnerId { get; private set; }

        private readonly List<Ticket> _tickets = new List<Ticket>();
        public IReadOnlyCollection<Ticket> Tickets => _tickets.AsReadOnly();

        public void AddTicket(Ticket ticket)
        {
            Guard.Against.Null(ticket, nameof(ticket));
            _tickets.Add(ticket);
        }

        private readonly List<ProjectMembership> _memberships = new List<ProjectMembership>();
        public IReadOnlyCollection<ProjectMembership> Memberships => _memberships.AsReadOnly();

        public IReadOnlyCollection<Member> Members => _memberships.Select(m => m.Member).ToList();

        public void SetOwner(Member member)
        {
            Guard.Against.Null(member, nameof(member));
            Owner = member;
            AddMember(member);
        }

        public void AddMember(Member member)
        {
            Guard.Against.Null(member, nameof(member));
            if (!_memberships.Any(m => m.MemberId == member.Id))
            {
                _memberships.Add(ProjectMembership.AddMember(this, member));
            }
        }

        public void Update(string newName, string? newDescription, DateOnly newStartDate, DateOnly newEndDate, ProjectStatus newStatus)
        {
            UpdateName(newName);
            UpdateDescription(newDescription);
            UpdateDates(newStartDate, newEndDate);
            UpdateStatus(newStatus);
        }

        public void UpdateName(string newName)
        {
            Guard.Against.NullOrWhiteSpace(newName, nameof(newName));
            Name = newName;
        }

        public void UpdateDescription(string? newDescription)
        {
            Description = newDescription;
        }

        public void UpdateDates(DateOnly newStartDate, DateOnly newEndDate)
        {
            Guard.Against.Null(newStartDate, nameof(newStartDate));
            Guard.Against.Null(newEndDate, nameof(newEndDate));
            Guard.Against.OutOfRange(newEndDate, nameof(newEndDate), newStartDate.AddDays(1), DateOnly.MaxValue);
            StartDate = newStartDate;
            EndDate = newEndDate;
        }

        public void UpdateStatus(ProjectStatus newStatus)
        {
            Guard.Against.EnumOutOfRange(newStatus);
            ProjectStatus = newStatus;
        }
    }
}
