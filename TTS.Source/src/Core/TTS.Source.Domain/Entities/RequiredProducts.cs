using System;
using TTS.Source.Domain.Base;

namespace TTS.Source.Domain.Entities
{
    public class RequiredProducts : BaseAggregateRoot<Guid>
    {
        public RequiredProducts() 
        {
            
        }

        public Product Product { get; set; }
        public Guid ProductId { get; set; }
        public DateTime NeededDate { get; set; }

    }
}
