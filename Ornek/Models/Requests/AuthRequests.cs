using KeremProject1backend.Models.DBs;
using System.ComponentModel.DataAnnotations; // For Required attribute

namespace KeremProject1backend.Models.Requests
{
    public class AuthRequests
    {

    }
    public class GetAllConfigurationDataRequest
    {

    }
    public class LoginRequest
    {
        [Required]
        public string UserName { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
    }

    public class SignUpRequest
    {
        [Required]
        public string UserName { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        public string UserImageLink { get; set; } = string.Empty;
    }

    public class RegisterAdminRequest
    {
        [Required]
        public string Username { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
        public string? UserImageLink { get; set; }
    }

    public class UpdatePasswordRequest
    {
        [Required]
        public string OldPassword { get; set; } = null!;
        [Required]
        public string NewPassword { get; set; } = null!;
    }
}
