using System.Collections.Generic;

namespace KeremProject1backend.Models.DBs
{
    public class ShoppingCart // Kullanıcıya özel kalıcı sepet için (isteğe bağlı)
    {
        public int Id { get; set; } // Veya UserId
        public int UserId { get; set; } // ASP.NET Core Identity kullanılıyorsa string, değilse int olabilir.
        public virtual ICollection<CartItem> Items { get; set; } = new List<CartItem>();
        // public DateTime LastModified { get; set; }
    }

    public class CartItem
    {
        public int Id { get; set; }
        public int ShoppingCartId { get; set; } // Veya direkt UserId
        public int ProductId { get; set; }
        public string ProductName { get; set; } = null!;
        public decimal UnitPrice { get; set; } // O anki fiyat
        public int Quantity { get; set; }

        // Navigation Properties
        public virtual ShoppingCart? ShoppingCart { get; set; } // Opsiyonel
        // public virtual Product Product { get; set; } // Product modeline bağlantı
    }
} 