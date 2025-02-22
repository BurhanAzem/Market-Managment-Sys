using System;
using System.Collections.Generic;

namespace TTS.Source.Domain.Entities
{
    public class Employee : User
    {
        public Employee(string userName, string cardId) : base(userName, cardId) {}
        public Employee(string? email, string userName, string cardId, string? phoneNumber) : base(email, userName, cardId, phoneNumber) {}
        public Employee(string email, string userName, string cardId, string? phoneNumber, string? imagePath, DateTime? birthDate) : base(email, userName, cardId, phoneNumber, imagePath, birthDate){}
        public Employee(string email, string userName, DateTime hireDate, string cardId, string? phoneNumber, string? imagePath, decimal? salary, Guid? managerId, DateTime? birthDate) : this(email, userName, cardId, phoneNumber, imagePath, birthDate)
        {
            HireDate = hireDate;
            Salary = salary;
            ManagerId = managerId;
        }

        public Manager? Manager { get; set; }
        public Guid? ManagerId { get; set; }
        public DateTime HireDate { get; set; } = DateTime.Now;
        public decimal? Salary { get; set; }
        public ICollection<SalesOperation> EmployeeSalesOperations { get; set; }
    }
}
