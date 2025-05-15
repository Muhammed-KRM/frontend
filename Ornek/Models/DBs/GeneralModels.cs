namespace KeremProject1backend.Models.DBs
{
    public class GeneralModels
    {
    }

    public class Report
    {
        public int Id { get; set; } // Benzersiz ID
        public int UserId { get; set; } // Raporu gönderen kullanıcının ID'si
        public string UserName { get; set; } // Raporu gönderen kullanıcının adı
        public string Title { get; set; } // Rapor başlığı
        public string Content { get; set; } // Rapor içeriği
        public DateTime CreatedAt { get; set; } // Oluşturulma tarihi
        public bool IsReviewed { get; set; } // Admin tarafından incelendi mi
    }
}
