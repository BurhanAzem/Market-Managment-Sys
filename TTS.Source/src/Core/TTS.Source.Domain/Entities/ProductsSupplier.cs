using System;
using Ardalis.GuardClauses;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Domain.Entities
{
    public class ProductsSupplier : BaseAggregateRoot<Guid>
    {
        private ProductsSupplier() { }

        // public SalesOperation(string name,
        //     string description,
        //     int BarCode)
        // {
        //     Guard.Against.NullOrWhiteSpace(name, nameof(name));
        //     // Guard.Against.Null(startDate, nameof(startDate));
        //     // Guard.Against.Null(endDate, nameof(endDate));
        //     // Guard.Against.OutOfRange(endDate, nameof(endDate), startDate.AddDays(1), DateOnly.MaxValue);
        //     // Guard.Against.EnumOutOfRange(projectStatus);
        //     // Guard.Against.Null(member, nameof(member));

        //     Name = name;
        //     Description = description;
        //     BarCode = BarCode;
        //     CreatedDate = DateTime.Now;
        // }
        public Supplier Supplier { get; set; } = null!;
        public Guid SupplierId { get; set; }
        public Product Product { get; set; } = null!;
        public Guid ProductId { get; set; }
        public decimal? WholeSalePurchasingPrice { get; set; }
        public decimal? RetailPurchasingPrice { get; set; }
    }
}
