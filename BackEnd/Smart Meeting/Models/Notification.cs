using Smart_Meeting.Models;

public class Notification
{
    public int ID { get; set; }
    public string Message { get; set; }

    // This is the correct foreign key for the Employee (IdentityUser)
    public string employeeId { get; set; }

    public Employee employee { get; set; }
}