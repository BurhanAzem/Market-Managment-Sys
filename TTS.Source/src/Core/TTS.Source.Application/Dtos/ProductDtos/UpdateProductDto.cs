using System;
using Ardalis.GuardClauses;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Application.Dtos
{
    public class UpdateProductDto : AddProductDto
    {
        public string? Name { get; set; }
        public double? BarCode { get; set; }
        public decimal? CurrentRetailSellingPrice { get; set; }
        public int? QuantityOfProductsPresentedForRetail { get; set; }
        public int? MinimumQuantityOfProductsPresentedForRetail { get; set; }

    }
}
