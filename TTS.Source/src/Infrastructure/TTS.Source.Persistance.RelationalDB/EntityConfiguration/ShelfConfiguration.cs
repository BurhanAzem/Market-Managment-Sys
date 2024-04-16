using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Hosting;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;
using static TTS.Source.Domain.Shared.Constants;

namespace TTS.Source.Persistance.RelationalDB.EntityConfiguration
{
    public class ShelfConfiguration : IEntityTypeConfiguration<Shelf>
{
    public void Configure(EntityTypeBuilder<Shelf> builder)
    {

        builder.Property(p => p.ShelfCode);
        

        builder.HasMany(u => u.Products)
               .WithOne(so => so.Shelf)
               .HasForeignKey(so => so.ShelfId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}

}
