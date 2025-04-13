using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Hosting;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;
using static TTS.Source.Domain.Shared.Constants;

namespace TTS.Source.Persistance.RelationalDB.EntityConfiguration
{
    public class SalesOperationConfiguration : IEntityTypeConfiguration<SaleOperations>
    {
        public void Configure(EntityTypeBuilder<SaleOperations> builder)
        {
            builder.ToTable("SalesOperation");
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Description).HasMaxLength(ProjectConstants.MaxDescriptionLength).IsRequired();
            builder.Property(p => p.TotalPrice).IsRequired();
            builder.Property(p => p.PaidPrice).IsRequired();
            builder.Property(p => p.OperationDate).HasColumnType("date");
            builder.Property(p => p.OperationStatus).HasConversion(new EnumToStringConverter<OperationStatus>());
            builder.HasMany(p => p.ProductsOperation).WithOne(t => t.SalesOperation).HasForeignKey(t => t.SalesOperationId).OnDelete(DeleteBehavior.Restrict);

        }
    }
}
