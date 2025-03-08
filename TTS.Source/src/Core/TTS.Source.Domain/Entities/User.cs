using TTS.Source.Domain.Base;
using Microsoft.AspNetCore.Identity;
// using TTS.Source.Application.Common.Contracts.Identity;

namespace TTS.Source.Domain.Entities
{
    public class User : IdentityUser<Guid>
    {
        public User(string userName, string? cardId) : base()
    {
        UserName = userName;
        CreatedDate = DateTime.Now;
        CardId = cardId;
    }
        public User(string? email, string userName, string? cardId, string? phoneNumber) : base()
    {
        Email = email;
        UserName = userName;
        CreatedDate = DateTime.Now;
        CardId = cardId;
        PhoneNumber = phoneNumber;
    }
        public User(string? email, string userName, string? cardId, string? phoneNumber, string? imagePath, DateTime? birthDate) : base()
    {
        Email = email;
        UserName = userName;
        CreatedDate = DateTime.Now;
        CardId = cardId;
        PhoneNumber = phoneNumber;
        ImagePath = imagePath;
        BirthDate = birthDate;
        
    }

        public DateTime CreatedDate { get; set; }
        public string? CardId { get; set; }
        public string? Discriminator { get; set; }
        public string? ImagePath { get; set; }
        public DateTime? BirthDate { get; set; }

        // public virtual ICollection<SalesOperation> CustomerSalesOperations { get; set; }
        // public virtual ICollection<SalesOperation> SellerSalesOperations { get; set; }

    }
}



