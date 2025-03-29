using System;
using System.Collections.Generic;

namespace TTS.Source.Domain.Entities
{
    public class Manager : Employee
    {
        // Minimal constructor with just CardId
        public Manager(string cardId) 
            : base(cardId) { }

        // Constructor with contact info
        public Manager(string? email, string cardId, string? phoneNumber, string firstName, string lastName) 
            : base(email, cardId, phoneNumber, firstName, lastName) { }

        // Full constructor with hire date and image path
        public Manager(
            string email,
            DateTime hireDate,
            string cardId,
            string? phoneNumber,
            string? imagePath,
            decimal? salary,
            Guid? managerId,
            DateTime? birthDate,
            string firstName,
            string lastName)
            : base(email, hireDate, cardId, phoneNumber, imagePath, salary, managerId, birthDate, firstName, lastName)
        {
        }

        // Extended constructor with branch_number
        public Manager(
            string email,
            DateTime hireDate,
            string cardId,
            string? phoneNumber,
            string? imagePath,
            decimal? salary,
            Guid? managerId,
            int? branch_number,
            DateTime? birthDate,
            string firstName,
            string lastName)
            : this(email, hireDate, cardId, phoneNumber, imagePath, salary, managerId, birthDate, firstName, lastName)
        {
            Branch_number = branch_number;
        }

        public int? Branch_number { get; set; }
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
        
    }
}
