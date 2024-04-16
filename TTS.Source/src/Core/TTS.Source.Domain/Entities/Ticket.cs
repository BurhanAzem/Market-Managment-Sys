using Ardalis.GuardClauses;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Domain.Entities
{
    public class Ticket : BaseAggregateRoot<Guid>
    {
        private Ticket() { }

        public Ticket(string name,
            string description,
            DateOnly startDate,
            DateOnly dueDate,
            TicketPriority ticketPriority,
            TicketStatus ticketStatus,
            Member assignee,
            Member reporter)
        {
            Guard.Against.NullOrWhiteSpace(name, nameof(name));
            Guard.Against.Null(startDate, nameof(startDate));
            Guard.Against.Null(dueDate, nameof(dueDate));
            Guard.Against.OutOfRange(dueDate, nameof(dueDate), startDate.AddDays(1), DateOnly.MaxValue);
            Guard.Against.Null(assignee, nameof(assignee));
            Guard.Against.Null(reporter, nameof(reporter));

            Name = name;
            Description = description;
            StartDate = startDate;
            DueDate = dueDate;
            TicketPriority = ticketPriority;
            TicketStatus = ticketStatus;
            CreatedDateTime = DateTime.UtcNow;
            SetAssignee(assignee);
            SetReporter(reporter);
        }

        public string Name { get; private set; } = null!;
        public string Description { get; private set; } = null!;
        public DateOnly StartDate { get; private set; }
        public DateOnly DueDate { get; private set; }
        public TicketPriority TicketPriority { get; private set; }
        public TicketStatus TicketStatus { get; private set; }
        public Member Reporter { get; private set; } = null!;
        public Guid ReporterId { get; private set; }
        public Member Assignee { get; private set; } = null!;
        public Guid AssigneeId { get; private set; }
        public Project Project { get; private set; } = null!;
        public Guid ProjectId { get; private set; }
        public DateTime CreatedDateTime { get; private set; }
        public DateTime? UpdatedDateTime { get; private set; }
        public Member? UpdatedBy { get; private set; }
        public Guid? UpdatedById { get; private set; }

        private readonly List<Comment> _comments = new List<Comment>();
        public IReadOnlyCollection<Comment> Comments => _comments.AsReadOnly();

        public void AddComment(Comment comment)
        {
            Guard.Against.Null(comment, nameof(comment));
            _comments.Add(comment);
        }

        public void Update(string newName, string newDescription, DateOnly newStartDate, DateOnly newDueDate, TicketPriority newPriority, TicketStatus newStatus, Member member)
        {
            UpdateName(newName);
            UpdateDescription(newDescription);
            UpdateDates(newStartDate, newDueDate);
            UpdatePriority(newPriority);
            UpdateStatus(newStatus);
            UpdateAuditInfo(member);
        }

        public void UpdateAuditInfo(Member member)
        {
            UpdatedDateTime = DateTime.UtcNow;
            UpdatedBy = member;
            UpdatedById = member.Id;
        }

        private void UpdateName(string newName)
        {
            Guard.Against.NullOrWhiteSpace(newName, nameof(newName));
            Name = newName;
        }

        private void UpdateDescription(string newDescription)
        {
            Description = newDescription;
        }

        private void UpdateDates(DateOnly newStartDate, DateOnly newDueDate)
        {
            Guard.Against.Null(newStartDate, nameof(newStartDate));
            Guard.Against.Null(newDueDate, nameof(newDueDate));
            Guard.Against.OutOfRange(newDueDate, nameof(newDueDate), newStartDate.AddDays(1), DateOnly.MaxValue);
            StartDate = newStartDate;
            DueDate = newDueDate;
        }

        private void UpdatePriority(TicketPriority newPriority)
        {
            TicketPriority = newPriority;
        }

        private void UpdateStatus(TicketStatus newStatus)
        {
            TicketStatus = newStatus;
        }

        private void SetAssignee(Member newAssignee)
        {
            Guard.Against.Null(newAssignee, nameof(newAssignee));
            Assignee = newAssignee;
        }

        private void SetReporter(Member newReporter)
        {
            Guard.Against.Null(newReporter, nameof(newReporter));
            Reporter = newReporter;
        }
    }
}
