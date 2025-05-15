using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KeremProject1backend.Models.DBs
{
    public class UsersModels
    {
    }

    [Table("Users")]
    public class AllUsersModels
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(64)]
        public string UserName { get; set; } = null!;
        [Required]
        public UserRoleinAuthorization UserRoleinAuthorization { get; set; }
        [Required]
        [StringLength(512)]
        public string PasswordHash { get; set; } = null!;
        [Required]
        public bool? State { get; set; }
        [StringLength(1024)]
        public string? UserImageLink { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime? ModTime { get; set; }
        public int? ModUser { get; set; }

    }

}
