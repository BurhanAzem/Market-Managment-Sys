using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Hosting;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;
using static TTS.Source.Domain.Shared.Constants;

namespace TTS.Source.Persistance.RelationalDB.EntityConfiguration
{
    public class DiscountConfiguration : IEntityTypeConfiguration<Discount>
    {
        public void Configure(EntityTypeBuilder<Discount> builder)
        {

            builder.Property(p => p.Amount);
            builder.Property(p => p.StartDate).HasColumnType("date");
            builder.Property(p => p.EndDate).HasColumnType("date");

            builder.HasMany(u => u.Products)
           .WithOne(so => so.Discount)
           .HasForeignKey(so => so.DiscountId)
           .OnDelete(DeleteBehavior.Restrict);
        }


    }
}


