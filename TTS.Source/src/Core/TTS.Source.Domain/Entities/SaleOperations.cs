using System;
using Ardalis.GuardClauses;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Domain.Entities
{
    public class SaleOperations : BaseAggregateRoot<Guid>
    {
        private SaleOperations() { }

        // public SalesOperation(string name,
        //     string description,
        //     int BarCode)
        // {
        //     Guard.Against.NullOrWhiteSpace(name, nameof(name));
        //     // Guard.Against.Null(startDate, nameof(startDate));
        //     // Guard.Against.Null(endDate, nameof(endDate));
        //     // Guard.Against.OutOfRange(endDate, nameof(endDate), startDate.AddDays(1), DateOnly.MaxValue);
        //     // Guard.Against.EnumOutOfRange(projectStatus);
        //     // Guard.Against.Null(member, nameof(member));

        //     Name = name;
        //     Description = description;
        //     BarCode = BarCode;
        //     CreatedDate = DateTime.Now;
        // }
        public Employee Employee { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public Customer Customer { get; set; } = null!;
        public Guid CustomerId { get; set; }
        public string Description { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal PaidPrice  { get; set; }
        public DateTime OperationDate  { get; set; } = DateTime.Now;
        public OperationStatus OperationStatus  { get; set; } = OperationStatus.NotPaid;
        public ICollection<ProductOperation> ProductsOperation { get; set; }

    }
}
