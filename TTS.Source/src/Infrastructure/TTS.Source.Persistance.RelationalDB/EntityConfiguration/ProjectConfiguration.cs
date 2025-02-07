using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Hosting;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;
using static TTS.Source.Domain.Shared.Constants;

namespace TTS.Source.Persistance.RelationalDB.EntityConfiguration
{
    public class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.ToTable("Project");
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Name).HasMaxLength(ProjectConstants.MaxNameLength).IsRequired();
            builder.Property(p => p.Description).HasMaxLength(ProjectConstants.MaxDescriptionLength).IsRequired(false);
            builder.Property(p => p.ProjectStatus).HasConversion(new EnumToStringConverter<ProjectStatus>());
            builder.Property(p => p.StartDate).HasColumnType("date");
            builder.Property(p => p.EndDate).HasColumnType("date");

            builder.HasOne(p => p.Owner).WithMany().HasForeignKey(p => p.OwnerId).OnDelete(DeleteBehavior.Restrict);
            builder.HasMany(p => p.Tickets).WithOne(t => t.Project).HasForeignKey(t => t.ProjectId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
