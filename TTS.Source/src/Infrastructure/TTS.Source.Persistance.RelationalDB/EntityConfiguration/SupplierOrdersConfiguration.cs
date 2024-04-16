using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Hosting;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;
using static TTS.Source.Domain.Shared.Constants;

namespace TTS.Source.Persistance.RelationalDB.EntityConfiguration
{
    public class SupplierOrdersConfiguration : IEntityTypeConfiguration<SupplierOrders>
    {
        public void Configure(EntityTypeBuilder<SupplierOrders> builder)
        {

            builder.Property(p => p.TotalPrice);
            builder.Property(p => p.OrderDate).HasColumnType("date");

        }
    }

}
