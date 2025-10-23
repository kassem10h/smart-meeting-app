using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Smart_Meeting.Models;
using System.Threading.Tasks;
using Smart_Meeting.JWT;
using Smart_Meeting.DTOs;

namespace Smart_Meeting.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<Employee> _userManager;
        private readonly SignInManager<Employee> _signInManager;
        private readonly GenerateJWT _jwt;

        public AuthController(UserManager<Employee> userManager, SignInManager<Employee> signInManager, GenerateJWT jwt)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwt = jwt;
        }

        // ---------------- Register ----------------
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existing = await _userManager.FindByEmailAsync(model.Email);
            if (existing != null)
                return BadRequest("Email already registered");

            var user = new Employee
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName, // Use FirstName
                LastName = model.LastName    // And LastName
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            // Assign role (Admin / Employee / User)
            await _userManager.AddToRoleAsync(user, model.Role ?? "User");

            return Ok("User registered successfully");
        }

        // ---------------- Login ----------------
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return Unauthorized("Invalid credentials");

            var check = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!check.Succeeded) return Unauthorized("Invalid credentials");

            var token = await _jwt.GenerateToken(user);
            return Ok(new { token });
        }
    }
}
