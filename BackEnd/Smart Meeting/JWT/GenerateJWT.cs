using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Smart_Meeting.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Smart_Meeting.JWT
{
    // FIX 1: The class is now a regular service.
    public class GenerateJWT
    {
        private readonly IConfiguration _config;
        private readonly UserManager<Employee> _userManager;

        // FIX 2: Dependencies are injected via the constructor.
        public GenerateJWT(IConfiguration config, UserManager<Employee> userManager)
        {
            _config = config;
            _userManager = userManager;
        }

        // FIX 3: The method is no longer static and is renamed to match your controller's call.
        public async Task<string> GenerateToken(Employee employee)
        {
            var roles = await _userManager.GetRolesAsync(employee);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, employee.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, employee.Id)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SigningKey"])); // Use the injected _config
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(5),
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"],
                SigningCredentials = creds,
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}