using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Hosting;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;
using static TTS.Source.Domain.Shared.Constants;

namespace TTS.Source.Persistance.RelationalDB.EntityConfiguration
{
    public class ProductsOperationConfiguration : IEntityTypeConfiguration<ProductOperation>
    {
        public void Configure(EntityTypeBuilder<ProductOperation> builder)
        {
            builder.ToTable("ProductsOperation");
            builder.HasKey(p => p.Id);
            builder.Property(p => p.CurrentSellingPrice).IsRequired();
            builder.Property(p => p.Quantity).IsRequired();

            builder.HasOne(p => p.Product).WithMany().HasForeignKey(p => p.ProductId).OnDelete(DeleteBehavior.Restrict).IsRequired(false);

        }
    }
}
