using System;
using System.Collections.Generic;

namespace TTS.Source.Domain.Entities
{
    public class Customer : User
    {
        public Customer(string cardId, string firstName, string lastName)
            : base(cardId, firstName, lastName) {}

        public Customer(string? email, string cardId, string? phoneNumber, string firstName, string lastName)
            : base(email, cardId, phoneNumber, firstName, lastName) {}

        public Customer(string email, string cardId, string? phoneNumber, string? imagePath, DateTime? birthDate, string firstName, string lastName)
            : base(email, cardId, phoneNumber, imagePath, birthDate, firstName, lastName) {}

        public Customer(string email, string cardId, string? phoneNumber, string? imagePath, double? latitude, double? longitude, DateTime? birthDate, string firstName, string lastName)
            : this(email, cardId, phoneNumber, imagePath, birthDate, firstName, lastName)
        {
            Latitude = latitude;
            Longitude = longitude;
        }

        public decimal? Points { get; set; } = 0;
        public decimal? DiscountPercentage { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }

        public virtual ICollection<SalesOperation> CustomerSalesOperations { get; set; } = new List<SalesOperation>();
    }
}
