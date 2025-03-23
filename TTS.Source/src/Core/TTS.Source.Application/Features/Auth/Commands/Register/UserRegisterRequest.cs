namespace TTS.Source.Application.Features.Identity.Models
{
    public record UserRegisterRequest(string? Email, string FirstName, string LastName, string? CardId, string? PhoneNumber, string UserRole, string Password);

}