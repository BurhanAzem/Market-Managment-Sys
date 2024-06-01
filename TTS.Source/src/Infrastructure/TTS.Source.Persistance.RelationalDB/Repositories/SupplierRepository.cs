using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Dtos;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Persistance.RelationalDB.Repositories
{
    public class SupplierRepository : Repository<Supplier>, ISupplierRepository
    {
        private readonly TTSDBContext _dbContext;
        public SupplierRepository(TTSDBContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> AddSupplier(AddSupplierDto supplierDto, CancellationToken cancellationToken)
        {
            // Check if the product already exists
            var supplier = await _dbContext.Suppliers.FirstOrDefaultAsync(s => s.Name == supplierDto.Email, cancellationToken);
            if (supplier != null)
            {
                throw new BadRequestException("This supplier already exists!");
            }

            var newSupplier = new Supplier
            {
                Name = supplierDto.Name,
                Address = supplierDto.Address,
                CreatedDate = DateTime.Now,
                Email = supplierDto.Email,
                PhoneNumber = supplierDto.PhoneNumber
            };
            _dbContext.Suppliers.Add(newSupplier);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return newSupplier.Id;
        }


        public async Task<IList<Supplier>> GetSuppliers(CancellationToken cancellationToken)
        {
            var suppliers = await _dbContext.Suppliers.ToListAsync();
            return suppliers;
        }


    }
}
