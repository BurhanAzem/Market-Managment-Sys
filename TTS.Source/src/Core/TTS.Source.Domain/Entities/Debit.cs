using System;
using Ardalis.GuardClauses;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Domain.Entities
{
    public class Debit : BaseAggregateRoot<Guid>
    {
        private Debit() { }
        public Customer Customer { get; set; } = null!;
        public Guid CustomerId { get; set; }
        public decimal DeservedAmount { get; set; }
        public DateTime LastPymentDate  { get; set; } = DateTime.Now;

    }
}
