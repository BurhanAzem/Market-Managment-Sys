﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using TTS.Source.Persistance.RelationalDB;

#nullable disable

namespace TTS.Source.Persistance.RelationalDB.Migrations
{
    [DbContext(typeof(TTSDBContext))]
    [Migration("20250411085051_MyMigration")]
    partial class MyMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Supplier", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Supplier", (string)null);
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.Debit", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("CustomerId")
                        .HasColumnType("uuid");

                    b.Property<decimal>("DeservedAmount")
                        .HasColumnType("numeric");

                    b.Property<DateTime>("LastPymentDate")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId")
                        .IsUnique();

                    b.ToTable("Debits");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.Discount", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<decimal>("Amount")
                        .HasColumnType("numeric");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("date");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.ToTable("Discounts");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.HotProduct", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("date");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("ProductId1")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("ProductId1");

                    b.ToTable("HotProduct");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.Member", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Member", (string)null);
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<double>("BarCode")
                        .HasColumnType("double precision");

                    b.Property<Guid?>("CategoryId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("date");

                    b.Property<decimal?>("CurrentRetailPurchasingPrice")
                        .HasColumnType("numeric");

                    b.Property<decimal>("CurrentRetailSellingPrice")
                        .HasColumnType("numeric");

                    b.Property<decimal?>("CurrentWholeSalSellingPrice")
                        .HasColumnType("numeric");

                    b.Property<decimal?>("CurrentWholeSalePurchasingPrice")
                        .HasColumnType("numeric");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.Property<Guid?>("DiscountId")
                        .HasColumnType("uuid");

                    b.Property<string>("ImagePath")
                        .HasColumnType("text");

                    b.Property<int>("MinimumQuantityOfProductsPresentedForRetail")
                        .HasColumnType("integer");

                    b.Property<int?>("MinimumQuantityOfProductsPresentedForWholesale")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.Property<int>("QuantityOfProductsPresentedForRetail")
                        .HasColumnType("integer");

                    b.Property<int?>("QuantityOfProductsPresentedForWholesale")
                        .HasColumnType("integer");

                    b.Property<Guid?>("ShelfId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("DiscountId");

                    b.HasIndex("ShelfId");

                    b.ToTable("Product", (string)null);
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.ProductOperation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("CurrentSellingPrice")
                        .HasColumnType("integer");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uuid");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer");

                    b.Property<Guid>("SalesOperationId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("SalesOperationId");

                    b.ToTable("ProductsOperation", (string)null);
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.ProductsSupplier", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uuid");

                    b.Property<decimal?>("RetailPurchasingPrice")
                        .HasColumnType("numeric");

                    b.Property<Guid>("SupplierId")
                        .HasColumnType("uuid");

                    b.Property<decimal?>("WholeSalePurchasingPrice")
                        .HasColumnType("numeric");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("SupplierId");

                    b.ToTable("ProductsSupplier", (string)null);
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.RapidChangeProduct", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("date");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("ProductId1")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("ProductId1");

                    b.ToTable("RapidChangeProduct");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.RequiredProducts", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("NeededDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("RequiredProducts");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.SaleOperations", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("CustomerId")
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.Property<Guid>("EmployeeId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("OperationDate")
                        .HasColumnType("date");

                    b.Property<string>("OperationStatus")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal>("PaidPrice")
                        .HasColumnType("numeric");

                    b.Property<decimal>("TotalPrice")
                        .HasColumnType("numeric");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("SalesOperation", (string)null);
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.Shelf", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("ShelfCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Shelfs");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.SupplierOrders", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("date");

                    b.Property<Guid>("SupplierId")
                        .HasColumnType("uuid");

                    b.Property<decimal>("TotalPrice")
                        .HasColumnType("numeric");

                    b.HasKey("Id");

                    b.HasIndex("SupplierId");

                    b.ToTable("SupplierOrders");
                });

            modelBuilder.Entity("User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("BirthDate")
                        .HasColumnType("date");

                    b.Property<string>("CardId")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("date");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasMaxLength(8)
                        .HasColumnType("character varying(8)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("ImagePath")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("Users", (string)null);

                    b.HasDiscriminator<string>("Discriminator").HasValue("User");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("Employee", b =>
                {
                    b.HasBaseType("User");

                    b.Property<Guid>("DebitId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("HireDate")
                        .HasColumnType("date");

                    b.Property<Guid?>("ManagerId")
                        .HasColumnType("uuid");

                    b.Property<decimal?>("Salary")
                        .HasColumnType("numeric");

                    b.HasIndex("DebitId");

                    b.HasIndex("ManagerId");

                    b.HasDiscriminator().HasValue("Employee");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.Customer", b =>
                {
                    b.HasBaseType("User");

                    b.Property<decimal?>("DiscountPercentage")
                        .HasColumnType("numeric");

                    b.Property<double?>("Latitude")
                        .HasColumnType("double precision");

                    b.Property<double?>("Longitude")
                        .HasColumnType("double precision");

                    b.Property<decimal?>("Points")
                        .HasColumnType("numeric");

                    b.HasDiscriminator().HasValue("Customer");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.Manager", b =>
                {
                    b.HasBaseType("Employee");

                    b.Property<int?>("Branch_number")
                        .HasColumnType("integer");

                    b.HasDiscriminator().HasValue("Manager");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.Debit", b =>
                {
                    b.HasOne("TTS.Source.Domain.Entities.Customer", "Customer")
                        .WithOne("Debit")
                        .HasForeignKey("TTS.Source.Domain.Entities.Debit", "CustomerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.HotProduct", b =>
                {
                    b.HasOne("TTS.Source.Domain.Entities.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("TTS.Source.Domain.Entities.Product", null)
                        .WithMany("HotProducts")
                        .HasForeignKey("ProductId1");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.Product", b =>
                {
                    b.HasOne("TTS.Source.Domain.Entities.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("TTS.Source.Domain.Entities.Discount", "Discount")
                        .WithMany("Products")
                        .HasForeignKey("DiscountId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("TTS.Source.Domain.Entities.Shelf", "Shelf")
                        .WithMany("Products")
                        .HasForeignKey("ShelfId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Category");

                    b.Navigation("Discount");

                    b.Navigation("Shelf");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.ProductOperation", b =>
                {
                    b.HasOne("TTS.Source.Domain.Entities.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("TTS.Source.Domain.Entities.SaleOperations", "SalesOperation")
                        .WithMany("ProductsOperation")
                        .HasForeignKey("SalesOperationId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Product");

                    b.Navigation("SalesOperation");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.ProductsSupplier", b =>
                {
                    b.HasOne("TTS.Source.Domain.Entities.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Supplier", "Supplier")
                        .WithMany()
                        .HasForeignKey("SupplierId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Product");

                    b.Navigation("Supplier");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.RapidChangeProduct", b =>
                {
                    b.HasOne("TTS.Source.Domain.Entities.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("TTS.Source.Domain.Entities.Product", null)
                        .WithMany("RapidChangeProducts")
                        .HasForeignKey("ProductId1");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.RequiredProducts", b =>
                {
                    b.HasOne("TTS.Source.Domain.Entities.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Product");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.SaleOperations", b =>
                {
                    b.HasOne("TTS.Source.Domain.Entities.Customer", "Customer")
                        .WithMany("CustomerSalesOperations")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Employee", "Employee")
                        .WithMany("SalesOperation")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.SupplierOrders", b =>
                {
                    b.HasOne("Supplier", "Supplier")
                        .WithMany("SupplierOrders")
                        .HasForeignKey("SupplierId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Supplier");
                });

            modelBuilder.Entity("Employee", b =>
                {
                    b.HasOne("TTS.Source.Domain.Entities.Debit", "Debit")
                        .WithMany()
                        .HasForeignKey("DebitId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TTS.Source.Domain.Entities.Manager", "Manager")
                        .WithMany("Employees")
                        .HasForeignKey("ManagerId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Debit");

                    b.Navigation("Manager");
                });

            modelBuilder.Entity("Supplier", b =>
                {
                    b.Navigation("SupplierOrders");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.Category", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.Discount", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.Product", b =>
                {
                    b.Navigation("HotProducts");

                    b.Navigation("RapidChangeProducts");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.SaleOperations", b =>
                {
                    b.Navigation("ProductsOperation");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.Shelf", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("Employee", b =>
                {
                    b.Navigation("SalesOperation");
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.Customer", b =>
                {
                    b.Navigation("CustomerSalesOperations");

                    b.Navigation("Debit")
                        .IsRequired();
                });

            modelBuilder.Entity("TTS.Source.Domain.Entities.Manager", b =>
                {
                    b.Navigation("Employees");
                });
#pragma warning restore 612, 618
        }
    }
}
