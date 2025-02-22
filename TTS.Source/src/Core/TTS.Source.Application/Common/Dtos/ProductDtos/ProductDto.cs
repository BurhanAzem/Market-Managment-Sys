using System;
using Ardalis.GuardClauses;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Application.Dtos
{
    public class ProductDto : BaseProductDto
    {
        public Guid Id { get; set; }
        public DiscountDto? DiscountDto { get; set; }
        public CategoryDto? CategoryDto { get; set; }
        public ShelfDto? ShelfDto { get; set; }

    }
}
