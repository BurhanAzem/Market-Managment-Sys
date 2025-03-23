using Microsoft.AspNetCore.Identity;

public class User : IdentityUser<Guid>
{
    public User(string? cardId) : base()
    {
        this.UserName = (FirstName + LastName).Replace(" ", "").ToLower();
        CreatedDate = DateTime.Now;
        CardId = cardId;
    }

    public User(string? cardId, string FirstName, string LastName) : base()
    {
        this.UserName = (FirstName + LastName).Replace(" ", "").ToLower();
        CreatedDate = DateTime.Now;
        CardId = cardId;
    }

    public User(string? email, string? cardId, string? phoneNumber, string FirstName, string LastName) : base()
    {
        Email = email;
        this.UserName = (FirstName + LastName).Replace(" ", "").ToLower();
        CreatedDate = DateTime.Now;
        CardId = cardId;
        PhoneNumber = phoneNumber;
    }

    public User(string? email, string? cardId, string? phoneNumber, string? imagePath, DateTime? birthDate, string FirstName, string LastName) : base()
    {
        Email = email;
        this.UserName = (FirstName + LastName).Replace(" ", "").ToLower();
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
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public DateTime? BirthDate { get; set; }
}
