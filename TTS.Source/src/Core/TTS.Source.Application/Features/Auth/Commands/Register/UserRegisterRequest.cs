namespace TTS.Source.Application.Features.Identity.Models
{
    public record UserRegisterRequest(string? Email, string UserName, string? CardId, string? PhoneNumber, string UserRole, string Password);

}