public class Employee : User
{
    public Employee(string cardId) : base(cardId) { }

    public Employee(string? email, string cardId, string? phoneNumber, string firstName, string lastName)
        : base(email, cardId, phoneNumber, firstName, lastName) { }

    public Employee(string email, DateTime hireDate, string cardId, string? phoneNumber,
                    string? imagePath, decimal? salary, Guid? managerId, DateTime? birthDate,
                    string firstName, string lastName)
        : base(email, cardId, phoneNumber, imagePath, birthDate, firstName, lastName)
    {
        HireDate = hireDate;
        Salary = salary;
        ManagerId = managerId;
    }

    public DateTime HireDate { get; set; }
    public decimal? Salary { get; set; }
    public Guid? ManagerId { get; set; }
}
