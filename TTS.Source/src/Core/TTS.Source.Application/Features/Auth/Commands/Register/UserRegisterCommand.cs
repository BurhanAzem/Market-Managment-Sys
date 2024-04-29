using MediatR;

namespace TTS.Source.Application.Features.Identity.Models
{
    public record UserRegisterCommand(string? Email, string UserName, string CardId, string? PhoneNumber, string UserRole, string Password): IRequest<UserResponseModel>;

}