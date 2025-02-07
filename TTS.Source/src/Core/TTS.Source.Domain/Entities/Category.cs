using System;
using TTS.Source.Domain.Base;

namespace TTS.Source.Domain.Entities
{
    public class Category : BaseAggregateRoot<Guid>
    {
         public Category()
         {}
        public Category(string name, string description) 
        {
            Name = name;
            Description = description;
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<Product> Products { get; set; }

    }
}
