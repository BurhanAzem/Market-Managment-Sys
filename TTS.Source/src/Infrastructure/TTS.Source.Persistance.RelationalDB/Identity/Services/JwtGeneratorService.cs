using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Persistance.RelationalDB.Identity.Services
{
    public class JwtGeneratorService : IJwtGeneratorService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        public JwtGeneratorService(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<string> GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:Key"]!);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    // new Claim(nameof(user.MemberId), applicationUser.MemberId.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Email!),
                }),
                Audience = _configuration["JwtSettings:Audience"],
                Issuer = _configuration["JwtSettings:Issuer"],
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            /*var isAdministrator = await _userManager.IsInRoleAsync(
                user,
                AdministratorRoleName);

            if (isAdministrator)
            {
                tokenDescriptor.Subject.AddClaim(new Claim(
                    ClaimTypes.Role,
                    AdministratorRoleName));
            }*/

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            return await Task.FromResult(encryptedToken);
        }
    }
}
