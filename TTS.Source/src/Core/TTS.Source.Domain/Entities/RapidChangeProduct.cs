using System;
using Ardalis.GuardClauses;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Domain.Entities
{
    public class RapidChangeProduct : BaseAggregateRoot<Guid>
    {
        public RapidChangeProduct() { }
        
        public DateTime CreatedDate  { get; set; } = DateTime.Now;
        public Product Product { get; set; } = null!;
        public Guid ProductId { get; set; }
    }
}
