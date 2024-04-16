using System;
using System.Collections.Generic;

namespace TTS.Source.Domain.Entities
{
    public class Manager : Employee
    {
        public Manager(string userName, string cardId) : base(userName, cardId) {}
        public Manager(string? email, string userName, string cardId, string? phoneNumber) : base(email, userName, cardId, phoneNumber) {}

        public Manager(string email, string userName, DateTime hireDate, string cardId, string? phoneNumber, string? imagePath, decimal? salary, Guid? managerId, DateTime? birthDate) : base(email, userName, hireDate, cardId, phoneNumber, imagePath, salary, managerId, birthDate)
        {
        }

        public Manager(string email, string userName, DateTime hireDate, string cardId, string? phoneNumber, string? imagePath, decimal? salary, Guid? managerId, int? branch_number, DateTime? birthDate) : this(email, userName, hireDate, cardId, phoneNumber, imagePath, salary, managerId, birthDate)
        {
            Branch_number = branch_number;
        }

        public int? Branch_number { get; set; }
        public ICollection<Employee> Employees { get; set; }
    }
}
