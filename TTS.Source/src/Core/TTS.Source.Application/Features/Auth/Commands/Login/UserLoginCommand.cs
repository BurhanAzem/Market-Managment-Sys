using MediatR;

namespace TTS.Source.Application.Features.Identity.Models
{
    public record UserLoginCommand(string? Email, string? PhoneNumber, string? CardId, string Password) : IRequest<UserResponseModel>;
}