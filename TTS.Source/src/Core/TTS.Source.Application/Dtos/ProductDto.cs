using System;
using Ardalis.GuardClauses;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Application.Dtos
{
    public class ProductDto 
    {
        public Guid? SupplierId { get; set; }
        public DiscountDto? DiscountDto { get; set; }
        public CategoryDto? CategoryDto { get; set; }
        public ShelfDto? ShelfDto { get; set; }
        public string Name { get; set; }
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

    }
}
