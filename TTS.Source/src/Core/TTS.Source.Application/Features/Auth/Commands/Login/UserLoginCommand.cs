using MediatR;

namespace TTS.Source.Application.Features.Identity.Models
{
    public record UserLoginCommand(string? Email, string? PhoneNumber, string? CardId, string UserRole, string Password) : IRequest<UserResponseModel>;
}