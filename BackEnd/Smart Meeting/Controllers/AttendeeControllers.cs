using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Smart_Meeting.Data;
using Smart_Meeting.DTOs;
using Smart_Meeting.Models;

namespace Smart_Meeting.Controllers
{
    [Route("api/{meetingID}/attendee")]
    [ApiController]
    public class AttendeeControllers : ControllerBase
    {
        private readonly AppDBContext _context;
        private readonly IMapper _mapper;
        public AttendeeControllers(AppDBContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AttendeeDto>>> GetAttendees(int meetingID)
        {
            var meetingExist = await _context.Meetings.FindAsync(meetingID);
            if (meetingExist == null) return NotFound("Meeting not found.");

            var attendees = await _context.Attendees
                .Include(a => a.employee)
                .Where(a => a.MeetingID == meetingID)
                .ToListAsync();

            var attendeeDtos = _mapper.Map<List<AttendeeDto>>(attendees);
            return Ok(attendeeDtos);
        }

        [HttpPost]
        public async Task<ActionResult> AddAttendee(int meetingID, AttendeeDto attendee)
        {
            var meetingExist = await _context.Meetings.FindAsync(meetingID);
            if (meetingExist == null) return NotFound("Meeting not found.");

            var attendeeExist = await _context.Attendees
                .FirstOrDefaultAsync(a => a.EmployeeID == attendee.EmployeeID && a.MeetingID == meetingID);
            if (attendeeExist != null) return Conflict("Employee is already an attendee for this meeting.");

            var newAttendee = _mapper.Map<Attendee>(attendee);
            newAttendee.MeetingID = meetingID;
            _context.Attendees.Add(newAttendee);
            await _context.SaveChangesAsync();
            return Ok("Attendee added successfully.");
        }

        [HttpDelete("{empId}")]
        // FIX: Changed the empId parameter from 'int' to 'string'.
        public async Task<IActionResult> DeleteAtendee(int meetingID, string empId)
        {
            var meetingExist = await _context.Meetings.FindAsync(meetingID);
            if (meetingExist == null) return NotFound("Meeting not found.");

            // Now the comparison between a.EmployeeID (string) and empId (string) works correctly.
            var attendeeExist = await _context.Attendees
                .FirstOrDefaultAsync(a => a.EmployeeID == empId && a.MeetingID == meetingID);
            if (attendeeExist == null) return NotFound("This employee is not an attendee of this meeting.");

            _context.Attendees.Remove(attendeeExist);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}