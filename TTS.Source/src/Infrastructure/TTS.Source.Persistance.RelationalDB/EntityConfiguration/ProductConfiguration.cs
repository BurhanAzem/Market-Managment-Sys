using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Hosting;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;
using static TTS.Source.Domain.Shared.Constants;

namespace TTS.Source.Persistance.RelationalDB.EntityConfiguration
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("Product");
            builder.HasKey(p => p.Id);
            builder.Property(p => p.BarCode).IsRequired();
            builder.Property(p => p.Name).HasMaxLength(ProjectConstants.MaxNameLength).IsRequired();
            builder.Property(p => p.Description).HasMaxLength(ProjectConstants.MaxDescriptionLength).IsRequired(false);
            builder.Property(p => p.ImagePath).IsRequired(false);
            builder.Property(p => p.QuantityOfProductsPresentedForWholesale);
            builder.Property(p => p.QuantityOfProductsPresentedForRetail);
            builder.Property(p => p.MinimumQuantityOfProductsPresentedForRetail);
            builder.Property(p => p.MinimumQuantityOfProductsPresentedForWholesale);
            builder.Property(p => p.CurrentRetailPurchasingPrice);
            builder.Property(p => p.CurrentRetailSellingPrice);
            builder.Property(p => p.CurrentWholeSalePurchasingPrice);
            builder.Property(p => p.CurrentRetailSellingPrice);
            builder.Property(p => p.CreatedDate).HasColumnType("date");

  
        

        }
    }
}
