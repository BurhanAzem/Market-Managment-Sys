

namespace TTS.Source.Application.Features.Identity.Models
{
    public record ResetPasswordResponseModel
    {
      
        public string Email { get; init; } = null!;
        public string Token { get; init; } = null!;

        public bool Success { get; init; }
        public string Message { get; init; } = null!;
    }
}
