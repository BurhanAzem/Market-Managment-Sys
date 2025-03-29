using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

public class Supplier : BaseAggregateRoot<Guid>
{
    public Supplier()
    {
        SupplierOrders = new List<SupplierOrders>();
        CreatedDate = DateTime.Now;
    }

    public Supplier(string Name, string? email, string? phoneNumber, string? address)
        : this()
    {
        this.Name = Name;
        Email = email;
        PhoneNumber = phoneNumber;
        Address = address;
    }

    public string Name { get; set; } 
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public DateTime CreatedDate { get; set; }
    public string? Address { get; set; }

    public ICollection<SupplierOrders> SupplierOrders { get; set; }
}
