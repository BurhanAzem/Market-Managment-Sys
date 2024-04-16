using System;
using TTS.Source.Domain.Base;

namespace TTS.Source.Domain.Entities
{
    public class SupplierOrders : BaseAggregateRoot<Guid>
    {
        public SupplierOrders() 
        {

        }

        public Supplier Supplier { get; set; }
        public Guid SupplierId { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }

    }
}
