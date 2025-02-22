using System;
using TTS.Source.Domain.Base;

namespace TTS.Source.Domain.Entities
{
    public class Supplier : BaseAggregateRoot<Guid>
    {
        public Supplier() 
        {

        }

        public string Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public string? Address { get; set; }

        public ICollection<SupplierOrders> SupplierOrders { get; set; }

    }
}
