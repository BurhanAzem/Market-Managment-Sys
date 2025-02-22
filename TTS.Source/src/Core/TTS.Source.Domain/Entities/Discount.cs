using System;
using TTS.Source.Domain.Base;

namespace TTS.Source.Domain.Entities
{
    public class Discount : BaseAggregateRoot<Guid>
    {
        public Discount()
        {}
        public Discount(decimal amount, DateTime startDate, DateTime endDate) 
        {
            Amount = amount;
            StartDate = startDate;
            EndDate = endDate;
        }

        public decimal  Amount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ICollection<Product> Products { get; set; }

    }
}
