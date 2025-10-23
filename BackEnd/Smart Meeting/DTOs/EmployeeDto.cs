using System.ComponentModel.DataAnnotations.Schema;

namespace Smart_Meeting.DTOs
{
    public class EmployeeDto
    {
        public string Id { get; set; }
        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string Email { get; set; }
    }
}
