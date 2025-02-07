namespace TTS.Source.Domain.Shared
{
    public enum OperationStatus
    {
        Paid,
        NotPaid,
        PartiallyPaid,
    }
    public enum ProjectStatus
    {
        Active,
        Completed,
        OnHold,
        Canceled,
        Pending,
        Delayed,
        UnderReview,
        Draft,
    }
    public enum TicketPriority
    {
        Low,
        Medium,
        High,
    }
    public enum TicketStatus
    {
        Pending,
        InProgress,
        Completed,
        Canceled
    }
}
