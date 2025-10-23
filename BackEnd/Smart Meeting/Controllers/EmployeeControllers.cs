using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Smart_Meeting.Data;
using Smart_Meeting.DTOs;
using Smart_Meeting.JWT;
using Smart_Meeting.Models;

namespace Smart_Meeting.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeControllers : ControllerBase
    {
        private readonly AppDBContext _context;
        private readonly UserManager<Employee> _userManager;
        private readonly IMapper _mapper;
        // FIX 1: The injected GenerateJWT service
        private readonly GenerateJWT _jwt;

        // FIX 2: Removed IConfiguration from the constructor
        public EmployeeControllers(UserManager<Employee> userManager, AppDBContext context, IMapper mapper, GenerateJWT jwt)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
            _jwt = jwt; // Assign the injected service
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployees()
        {
            var employeeList = await _context.Users.ToListAsync();
            var dtoResult = _mapper.Map<List<EmployeeDto>>(employeeList);
            return Ok(dtoResult);
        }

        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee(string id)
        {
            var employee = await _context.Users.FindAsync(id);
            if (employee == null)
                return NotFound();
            var dtoResult = _mapper.Map<EmployeeDto>(employee);
            return Ok(dtoResult);
        }

        // POST: api/Employee
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<EmployeeDto>> CreateEmployee(CreateEmployeeDto employee)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                var allowedRoles = new[] { "Admin", "Employee", "User" };
                if (!allowedRoles.Contains(employee.Role))
                    return BadRequest("Invalid role specified.");

                var EmployeeExist = await _userManager.FindByEmailAsync(employee.Email);
                if (EmployeeExist != null) return Conflict("Employee with this email already exists");

                var NewEmployee = _mapper.Map<Employee>(employee);

                var createdEmployee = await _userManager.CreateAsync(NewEmployee, employee.Password);
                if (!createdEmployee.Succeeded) return StatusCode(500, createdEmployee.Errors);

                var roleResult = await _userManager.AddToRoleAsync(NewEmployee, employee.Role);
                if (!roleResult.Succeeded) return StatusCode(500, roleResult.Errors);

                var employeeDto = _mapper.Map<EmployeeDto>(NewEmployee);
                return CreatedAtAction(nameof(GetEmployee), new { id = NewEmployee.Id }, employeeDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        
        // PUT: api/Employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(string id, EmployeeDto employee)
        {
            if (id != employee.Id)
            {
                return BadRequest("ID mismatch in URL and body.");
            }

            var existEmployee = await _context.Users.FindAsync(id);
            if (existEmployee == null)
                return NotFound();

            _mapper.Map(employee, existEmployee);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(string id)
        {
            var employee = await _userManager.FindByIdAsync(id);
            if (employee == null)
                return NotFound();

            var result = await _userManager.DeleteAsync(employee);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return NoContent();
        }
    }
}