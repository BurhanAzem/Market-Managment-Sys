using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Hosting;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;
using static TTS.Source.Domain.Shared.Constants;

namespace TTS.Source.Persistance.RelationalDB.EntityConfiguration
{
    public class ManagerConfiguration : IEntityTypeConfiguration<Manager>
{
    public void Configure(EntityTypeBuilder<Manager> builder)
    {
        
        builder.Property(p => p.HireDate).HasColumnType("date");
        builder.Property(p => p.Salary);
        builder.Property(p => p.Branch_number);



        // builder.HasMany(u => u.Employees)
        //        .WithOne(so => so.Manager)
        //        .HasForeignKey(so => so.ManagerId)
        //        .OnDelete(DeleteBehavior.Restrict);

    }
}

}
