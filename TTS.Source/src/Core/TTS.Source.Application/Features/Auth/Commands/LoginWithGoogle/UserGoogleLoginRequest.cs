// Application/Features/Identity/Models/GoogleLoginRequest.cs
namespace TTS.Source.Application.Features.Identity.Models
{
    public record GoogleLoginRequest(string TokenId, string UserRole);
}
