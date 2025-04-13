using System;
using Ardalis.GuardClauses;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Domain.Entities
{
    public class ProductOperation : BaseAggregateRoot<Guid>
    {
        private ProductOperation() { }
        public SaleOperations SalesOperation { get; set; } = null!;
        public Guid SalesOperationId { get; set; }
        public Product Product { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public int CurrentSellingPrice  { get; set; }


    }
}
