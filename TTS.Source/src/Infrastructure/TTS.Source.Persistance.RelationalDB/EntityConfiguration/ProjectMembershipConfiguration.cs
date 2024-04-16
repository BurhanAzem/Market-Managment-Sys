using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Persistance.RelationalDB.EntityConfiguration
{
    internal class ProjectMembershipConfiguration : IEntityTypeConfiguration<ProjectMembership>
    {
        public void Configure(EntityTypeBuilder<ProjectMembership> builder)
        {
            builder.ToTable("ProjectMembership");
            builder.HasKey(p => p.Id);

            builder.HasOne(sc => sc.Project)
                .WithMany(s => s.Memberships)
                .HasForeignKey(sc => sc.ProjectId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
