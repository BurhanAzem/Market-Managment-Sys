using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Hosting;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;
using static TTS.Source.Domain.Shared.Constants;

namespace TTS.Source.Persistance.RelationalDB.EntityConfiguration
{
    public class SupplierConfiguration : IEntityTypeConfiguration<Supplier>
{
    public void Configure(EntityTypeBuilder<Supplier> builder)
    {
        builder.ToTable("Supplier");
 
        builder.Property(p => p.firstName);
        builder.Property(p => p.lastName);
        builder.Property(p => p.Address);
        builder.Property(p => p.PhoneNumber);
        builder.Property(p => p.CreatedDate).HasColumnType("date");
        builder.Property(p => p.Email);
    
        builder.HasMany(u => u.SupplierOrders)
               .WithOne(so => so.Supplier)
               .HasForeignKey(so => so.SupplierId)
               .OnDelete(DeleteBehavior.Restrict);

    }
}

}
