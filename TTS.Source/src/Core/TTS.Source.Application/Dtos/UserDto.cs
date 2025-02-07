namespace TTS.Source.Application.Features.Identity.Models
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CardId { get; set; }
        public string? Discriminator { get; set; }
        public string? ImagePath { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? UserName { get; set; }
        public string? NormalizedUserName { get; set; }
        public string? Email { get; set; }
        public string? NormalizedEmail { get; set; }
        public bool? EmailConfirmed { get; set; }
        public string? SecurityStamp { get; set; }
        public string? ConcurrencyStamp { get; set; }
        public string? PhoneNumber { get; set; }
        public bool? PhoneNumberConfirmed { get; set; }
        public bool? TwoFactorEnabled { get; set; }
        public DateTimeOffset? LockoutEnd { get; set; }
        public bool? LockoutEnabled { get; set; }
        public int? AccessFailedCount { get; set; }
    }
}