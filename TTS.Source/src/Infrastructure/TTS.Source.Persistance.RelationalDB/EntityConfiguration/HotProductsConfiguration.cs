using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Hosting;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;
using static TTS.Source.Domain.Shared.Constants;

namespace TTS.Source.Persistance.RelationalDB.EntityConfiguration
{
    public class HotProductConfiguration : IEntityTypeConfiguration<HotProduct>
    {
        public void Configure(EntityTypeBuilder<HotProduct> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.CreatedDate).HasColumnType("date");
            builder.HasOne(p => p.Product).WithMany().HasForeignKey(p => p.ProductId).OnDelete(DeleteBehavior.Restrict).IsRequired(false);

        }
    }
}
