using KeremProject1backend.Models.DBs;

namespace KeremProject1backend.Models.Responses
{
    public class LoginResponse
    {
        public string Token { get; set; } = null!;
        public int UserId { get; set; }
        public string? UserName { get; set; }
        public string? UserImageLink { get; set; }
        public UserRoleinAuthorization UserRoleinAuthorization { get; set; }
    }

    public class SignUpResponse
    {
        public int UserId { get; set; }
        public string? UserName { get; set; }
        public string? UserRole { get; set; }
        public string? Message { get; set; }
    }
} 