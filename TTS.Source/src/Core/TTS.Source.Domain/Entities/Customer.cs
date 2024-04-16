using System;

namespace TTS.Source.Domain.Entities
{
    public class Customer : User
    {
        public Customer(string userName, string cardId) : base(userName, cardId) {}
        public Customer(string? email, string userName, string cardId, string? phoneNumber) : base(email, userName, cardId, phoneNumber) {}

        public Customer(string email, string userName, string cardId, string? phoneNumber, string? imagePath, DateTime? birthDate) : base(email, userName, cardId, phoneNumber, imagePath, birthDate)
        {

        }
        public Customer(string email, string userName, string cardId, string? phoneNumber, string? imagePath, double? latitude, double? longitude, DateTime? birthDate) : this(email, userName, cardId, phoneNumber, imagePath, birthDate)
        {
            Latitude = latitude;
            Longitude = longitude;
        }
        public decimal? Points { get; set; } = 0;
        public decimal? DiscountPercentage { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public virtual ICollection<SalesOperation> CustomerSalesOperations { get; set; }
    }
}
