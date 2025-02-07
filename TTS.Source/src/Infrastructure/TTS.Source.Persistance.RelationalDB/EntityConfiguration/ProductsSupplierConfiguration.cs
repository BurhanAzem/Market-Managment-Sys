using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Hosting;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;
using static TTS.Source.Domain.Shared.Constants;

namespace TTS.Source.Persistance.RelationalDB.EntityConfiguration
{
    public class ProductsSupplierConfiguration : IEntityTypeConfiguration<ProductsSupplier>
    {
        public void Configure(EntityTypeBuilder<ProductsSupplier> builder)
        {
            builder.ToTable("ProductsSupplier");
            builder.Property(p => p.WholeSalePurchasingPrice);
            builder.Property(p => p.RetailPurchasingPrice);


            builder.HasOne(p => p.Supplier).WithMany().HasForeignKey(p => p.SupplierId).OnDelete(DeleteBehavior.Restrict).IsRequired(false); ;
            builder.HasOne(p => p.Product).WithMany().HasForeignKey(p => p.ProductId).OnDelete(DeleteBehavior.Restrict).IsRequired(false);

        }
    }
}
