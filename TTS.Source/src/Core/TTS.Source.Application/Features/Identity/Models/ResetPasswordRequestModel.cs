using System.ComponentModel.DataAnnotations;

namespace TTS.Source.Application.Features.Identity.Models
{
    public record ResetPasswordRequestModel
    {
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; init; } = null!;

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; init; } = null!;

        public string Email { get; init; } = null!;
        public string Token { get; init; } = null!;
    }
}
    