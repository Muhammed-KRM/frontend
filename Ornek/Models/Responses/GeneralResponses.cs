using KeremProject1backend.Models.DBs; // OrderStatus enum'ı için eklendi
using System.Collections.Generic;
using System;

namespace KeremProject1backend.Models.Responses
{
    public class GeneralResponses
    {
    }

    public class ReportResponse
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? UserName { get; set; } // Make nullable
        public string? Title { get; set; } // Make nullable
        public string? Content { get; set; } // Make nullable
        public DateTime CreatedAt { get; set; }
        public bool IsReviewed { get; set; }
    }
}

// --- E-Ticaret Yanıt Modelleri ---

public class CartResponse
{
    public int UserId { get; set; }
    public List<CartItemResponse> Items { get; set; } = new List<CartItemResponse>();
    public decimal TotalPrice { get; set; }
}

public class CartItemResponse
{
    public int ItemId { get; set; }
    public int ProductId { get; set; }
    public string? ProductName { get; set; } // Make nullable
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice => Quantity * UnitPrice;
}

public class InitiatePaymentResponse
{
    public string PayTrToken { get; set; } = null!; // Keep as non-nullable (should always have value on success)
    public string MerchantOid { get; set; } = null!; // Keep as non-nullable
}

public class OrderSummaryResponse
{
    public int OrderId { get; set; }
    public string MerchantOid { get; set; } = null!; // Keep as non-nullable
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public string? Status { get; set; } // Make nullable (or initialize if needed)
}

public class OrderDetailsResponse : OrderSummaryResponse
{
    public List<OrderItemResponse> Items { get; set; } = new List<OrderItemResponse>();
    public string? ShippingAddress { get; set; }
    public string? BillingAddress { get; set; }
    public string? TrackingNumber { get; set; }
    public string? ShippingCarrier { get; set; }
     public DateTime? ShippedDate { get; set; }
    public DateTime? DeliveredDate { get; set; } 
}

public class OrderItemResponse
{
    public int ProductId { get; set; }
    public string? ProductName { get; set; } // Make nullable
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice => Quantity * UnitPrice;
}

public class ProductReviewResponse
{
    public int Id { get; set; } // Yorumun ID'si
    public int UserId { get; set; } // Yorumu yapanın ID'si (int olmalı)
    public string? UserName { get; set; } // Yorumu yapanın adı
    public byte Rating { get; set; }
    public string? Comment { get; set; }
    public DateTime ReviewDate { get; set; }
    // public bool IsApproved { get; set; } // Onay durumu gerekirse eklenebilir
}

public class TrackingInfoResponse
{
    public string? Status { get; set; } // Make nullable
    public string? TrackingNumber { get; set; } // Kargo Takip Numarası
    public string? ShippingCarrier { get; set; } // Kargo Firması

    // İsteğe bağlı: Kargo API'sinden alınabilecek ek bilgiler
    // public string? CurrentLocation { get; set; }
    // public DateTime? EstimatedDelivery { get; set; }
    // public List<TrackingEvent>? Details { get; set; }
}

// public class TrackingEvent
// {
//     public DateTime Timestamp { get; set; }
//     public string Location { get; set; }
//     public string Description { get; set; }
// }

// --- Ürün Yönetimi Yanıt Modelleri ---

public class ProductSummaryResponse // Liste için özet bilgi
{
    public int Id { get; set; }
    public string? Name { get; set; } // Make nullable
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsActive { get; set; }
}

public class ProductDetailsResponse : ProductSummaryResponse // Detay için daha fazla bilgi
{
    public string? Description { get; set; }
    public int StockQuantity { get; set; }
    // public string? CategoryName { get; set; }
}

// İsteğe bağlı: Sayfalama için response
// public class PagedProductResponse
// {
//     public List<ProductSummaryResponse> Products { get; set; }
//     public int TotalCount { get; set; }
//     public int PageNumber { get; set; }
//     public int PageSize { get; set; }
//     public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
// }

// --- Kategori Yanıt Modeli ---

public class CategoryResponse
{
    public int Id { get; set; }
    public string? Name { get; set; } // Make nullable
    public string? Description { get; set; }
    // public int ProductCount { get; set; } // İsteğe bağlı: Kategorideki ürün sayısı
}

// --- İade Talebi Yanıt Modeli (Admin için Liste) ---

public class ReturnRequestSummaryResponse
{
    public int OrderId { get; set; }
    public string MerchantOid { get; set; } = null!; // Keep as non-nullable
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public int UserId { get; set; }
    // public string UserName { get; set; } // Kullanıcı adı da eklenebilir
    public string? ReturnReason { get; set; } // Kullanıcının iade sebebi
    public string CurrentStatus { get; set; } = OrderStatus.ReturnRequested.ToString(); // Bu liste sadece ReturnRequested olanları gösterecek
    // public DateTime? ReturnRequestDate { get; set; }
}
