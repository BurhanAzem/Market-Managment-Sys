namespace TTS.Source.Application.Features.Identity.Models
{
    public record UserLoginRequest(string? Email, string? PhoneNumber, string CardId, string Password);
}