namespace TTS.Source.Application.Features.Identity.Models
{
    public record ForgotPasswordResponseModel(string Token, string Email);
}