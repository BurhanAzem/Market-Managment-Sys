using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;
using TTS.Source.Persistance.RelationalDB.Identity;

namespace TTS.Source.Persistance.RelationalDB
{
    public class TTSDBContext : IdentityUserContext<User, Guid>
    {
        public TTSDBContext(DbContextOptions<TTSDBContext> options) : base(options)
        { }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<ProjectMembership> ProjectMemberships { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public DbSet<User> Users { get; set; }
        public DbSet<SalesOperation> SalesOperations { get; set; }
        public DbSet<ProductOperation> ProductOperations { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Debit> Debits { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Manager> Managers { get; set; }
        public DbSet<ProductsSupplier> ProductsSupplier { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<RequiredProducts> RequiredProducts { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<SupplierOrders> SupplierOrders { get; set; }
        public DbSet<Shelf> Shelfs { get; set; }














        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Ignore<IdentityRole>();
            builder.Ignore<IdentityUserToken<Guid>>();
            builder.Ignore<IdentityUserRole<Guid>>();
            builder.Ignore<IdentityUserLogin<Guid>>();
            builder.Ignore<IdentityUserClaim<Guid>>();
            builder.Ignore<IdentityRoleClaim<Guid>>();


            builder.Entity<User>().UseTphMappingStrategy();

            builder.Entity<User>()
            .HasDiscriminator<string>("Discriminator")
            .HasValue<Customer>("Customer")
            .HasValue<Employee>("Employee")
            .HasValue<Manager>("Manager");

            // builder.Entity<Customer>().ToTable("Users");
            // builder.Entity<Employee>().ToTable("Users");
            // builder.Entity<Manager>().ToTable("Users");



            builder.ApplyConfigurationsFromAssembly(typeof(TTSDBContext).Assembly);
        }


    }
}
