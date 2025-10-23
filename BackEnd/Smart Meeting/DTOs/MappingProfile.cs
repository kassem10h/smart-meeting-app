using AutoMapper;
using Smart_Meeting.Models;

namespace Smart_Meeting.DTOs
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Employee Mappings
            CreateMap<Employee, EmployeeDto>().ReverseMap();
            CreateMap<Employee, CreateEmployeeDto>().ReverseMap();
            CreateMap<Employee, RegisterDto>().ReverseMap();

            // Meeting Mappings
            CreateMap<Meeting, MeetingDto>().ReverseMap();

            // Attendee Mappings
            CreateMap<Attendee, AttendeeDto>().ReverseMap();

            // Room Mappings
            CreateMap<Room, RoomDto>().ReverseMap();

            // Minutes of Meeting Mappings
            CreateMap<MinutesOfMeeting, MinutesOfMeetingDto>().ReverseMap();

            // Add any other mappings you need here
        }
    }
}