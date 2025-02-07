using System;
using Ardalis.GuardClauses;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Domain.Entities
{
    public class Product : BaseAggregateRoot<Guid>
    {
        public Product() { }

        // public Product(string name,
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
        //     // BarCode = barCode;
        //     CreatedDate = DateTime.Now;
        // }
        public Supplier? Supplier { get; set; } = null!;
        public Guid? SupplierId { get; set; }
        public Shelf? Shelf { get; set; } = null!;
        public Guid? ShelfId { get; set; }
        public Discount? Discount { get; set; } = null!;
        public Guid? DiscountId { get; set; }
        public Category? Category { get; set; } = null!;
        public Guid? CategoryId { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string? ImagePath { get; set; }
        public double BarCode { get; set; }
        public decimal? CurrentWholeSalePurchasingPrice { get; set; }
        public decimal? CurrentWholeSalSellingPrice { get; set; }
        public decimal? CurrentRetailPurchasingPrice { get; set; }
        public decimal CurrentRetailSellingPrice { get; set; }
        public int QuantityOfProductsPresentedForRetail { get; set; }
        public int? QuantityOfProductsPresentedForWholesale  { get; set; }
        public int MinimumQuantityOfProductsPresentedForRetail { get; set; }
        public int? MinimumQuantityOfProductsPresentedForWholesale  { get; set; }
        public DateTime CreatedDate  { get; set; } = DateTime.Now;

    }
}
