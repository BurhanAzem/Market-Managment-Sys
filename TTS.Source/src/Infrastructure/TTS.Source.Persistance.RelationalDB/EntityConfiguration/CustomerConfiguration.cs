using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Hosting;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;
using static TTS.Source.Domain.Shared.Constants;

namespace TTS.Source.Persistance.RelationalDB.EntityConfiguration
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> builder)
    {
        
        builder.Property(p => p.Points);
        builder.Property(p => p.DiscountPercentage);
        builder.Property(p => p.Latitude);
        builder.Property(p => p.Longitude);


        builder.HasMany(u => u.CustomerSalesOperations)
               .WithOne(so => so.Customer)
               .HasForeignKey(so => so.CustomerId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}

}
