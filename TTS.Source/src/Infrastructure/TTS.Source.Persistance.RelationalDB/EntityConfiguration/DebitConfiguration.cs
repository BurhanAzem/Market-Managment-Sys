﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Hosting;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;
using static TTS.Source.Domain.Shared.Constants;

namespace TTS.Source.Persistance.RelationalDB.EntityConfiguration
{
    public class DebitConfiguration : IEntityTypeConfiguration<Debit>
    {
        public void Configure(EntityTypeBuilder<Debit> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.LastPymentDate).HasColumnType("date");
            builder.HasOne(d => d.Customer)
                    .WithOne(u => u.Debit)
                    .HasForeignKey<Debit>(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
