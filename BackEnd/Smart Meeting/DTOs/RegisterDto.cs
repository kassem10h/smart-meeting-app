using System.ComponentModel.DataAnnotations;

namespace Smart_Meeting.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string FirstName { get; set; } // Change this

        [Required]
        public string LastName { get; set; } // And add this

        public string? Role { get; set; }
    }
}