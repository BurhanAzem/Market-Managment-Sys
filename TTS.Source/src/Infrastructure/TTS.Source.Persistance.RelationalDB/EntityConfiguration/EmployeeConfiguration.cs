using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Hosting;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;
using static TTS.Source.Domain.Shared.Constants;

namespace TTS.Source.Persistance.RelationalDB.EntityConfiguration
{
    public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
{
    public void Configure(EntityTypeBuilder<Employee> builder)
    {
        
        builder.Property(p => p.HireDate).HasColumnType("date");
        builder.Property(p => p.Salary);


        // builder.HasMany(u => u.EmployeeSalesOperations)
        //        .WithOne(so => so.Employee)
        //        .HasForeignKey(so => so.EmployeeId)
        //        .OnDelete(DeleteBehavior.Restrict);

    }
}

}
