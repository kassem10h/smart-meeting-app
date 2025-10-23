namespace Smart_Meeting.Models
{
    public class Attendee
    {
        
        public string EmployeeID { get; set; }

        public int MeetingID { get; set; }

        public Employee? employee { get; set; }

        public Meeting? meeting { get; set; }
    }
}