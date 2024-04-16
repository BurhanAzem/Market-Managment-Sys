using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using static TTS.Source.Domain.Shared.Constants;
using TTS.Source.Domain.Entities;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Persistance.RelationalDB.EntityConfiguration
{
    public class TicketConfiguration : IEntityTypeConfiguration<Ticket>
    {
        public void Configure(EntityTypeBuilder<Ticket> builder)
        {
            builder.ToTable("Ticket");
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Name).HasMaxLength(ProjectConstants.MaxNameLength).IsRequired();
            builder.Property(t => t.Description).HasMaxLength(ProjectConstants.MaxDescriptionLength);
            builder.Property(t => t.TicketPriority).HasConversion(new EnumToStringConverter<TicketPriority>());
            builder.Property(t => t.TicketStatus).HasConversion(new EnumToStringConverter<TicketStatus>());
            builder.Property(t => t.StartDate).HasColumnType("date");
            builder.Property(t => t.DueDate).HasColumnType("date");
            builder.Property(t => t.CreatedDateTime).HasColumnType("timestamp with time zone");
            builder.Property(t => t.UpdatedDateTime).HasColumnType("timestamp with time zone");
            builder.Property(t => t.UpdatedById).IsRequired(false);

            builder.HasOne(t => t.Assignee).WithMany().HasForeignKey(t => t.AssigneeId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(t => t.Reporter).WithMany().HasForeignKey(t => t.ReporterId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(t => t.Project).WithMany(t => t.Tickets).HasForeignKey(t=>t.ProjectId).OnDelete(DeleteBehavior.Restrict);
            builder.HasMany(t => t.Comments).WithOne(c => c.Ticket).HasForeignKey(c => c.TicketId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
