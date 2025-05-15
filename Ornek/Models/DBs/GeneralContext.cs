using KeremProject1backend.Services;
using Microsoft.EntityFrameworkCore;

namespace KeremProject1backend.Models.DBs
{
    public class GeneralContext : DbContext
    {
        public GeneralContext(DbContextOptions<GeneralContext> options) : base(options)
        {
        }

        public virtual DbSet<Report> Reports { get; set; }
        public virtual DbSet<DataLog> DataLog { get; set; }

        // E-ticaret Modelleri için DbSet'ler
        public virtual DbSet<ShoppingCart> ShoppingCarts { get; set; } // Kalıcı sepet kullanılıyorsa
        public virtual DbSet<CartItem> CartItems { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderItem> OrderItems { get; set; }
        public virtual DbSet<ProductReview> ProductReviews { get; set; }
        public virtual DbSet<Product> Products { get; set; } // Ürünler için DbSet eklendi

        // Eksik olan DbSet
        public virtual DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("General");

            modelBuilder.Entity<Report>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_Report");

                entity.Property(e => e.Id)
                      .ValueGeneratedOnAdd()
                      .HasColumnName("Id");
            });

            modelBuilder.Entity<DataLog>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_Data_Log");

                entity.Property(e => e.Id)
                      .ValueGeneratedOnAdd()
                      .HasColumnName("Id");
            });

            // Yeni Modeller için Fluent API Konfigürasyonları (Gerekirse)
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasIndex(e => e.MerchantOid).IsUnique(); // MerchantOid benzersiz olmalı
                entity.Property(e => e.Status).HasConversion<byte>(); // Enum'ı byte olarak sakla
                entity.Property(e => e.TotalAmount).HasColumnType("decimal(18, 2)");

                // İlişki: Bir siparişin çok sayıda öğesi olabilir
                entity.HasMany(o => o.OrderItems)
                      .WithOne(oi => oi.Order)
                      .HasForeignKey(oi => oi.OrderId);
            });

            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.Property(e => e.UnitPrice).HasColumnType("decimal(18, 2)");
            });

            modelBuilder.Entity<CartItem>(entity =>
            {
                entity.Property(e => e.UnitPrice).HasColumnType("decimal(18, 2)");
            });

            modelBuilder.Entity<Product>(entity => // Product için konfigürasyon eklendi
            {
                entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
                entity.HasIndex(e => e.Name); // İsme göre index eklemek aramalarda performansı artırabilir
            });

            // ShoppingCart, ProductReview ve diğerleri için ek konfigürasyonlar...
            // Örnek: Eğer Product modeli varsa, CartItem ve OrderItem'dan Product'a ilişki tanımlanabilir.

            // Kategori yapılandırması
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(c => c.Id);
                entity.HasIndex(c => c.Name).IsUnique(); // Kategori isimleri benzersiz olsun
            });
        }
    }
}
