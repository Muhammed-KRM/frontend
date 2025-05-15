using KeremProject1backend.Models.DBs;

namespace KeremProject1backend.Models.Responses
{
    public class UserResponses
    {
    }
    public class UpdateUserResponses
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public UserRoleinAuthorization UserRoleinAuthorization { get; set; }
        public string? PasswordHash { get; set; }
        public bool State { get; set; }
        public string? UserImageLink { get; set; }
        public DateTime ModTime { get; set; }
        public int ModUser { get; set; }

    }
}
