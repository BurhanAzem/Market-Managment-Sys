using System;
using TTS.Source.Domain.Base;

namespace TTS.Source.Domain.Entities
{
    public class Shelf : BaseAggregateRoot<Guid>
    {
         public Shelf()
         {}
        public Shelf(string shelfCode) 
        {
            ShelfCode = shelfCode;
        }

        public string ShelfCode { get; set; }
        public ICollection<Product> Products { get; set; }

    }
}
