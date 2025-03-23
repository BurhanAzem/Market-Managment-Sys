using MediatR;

namespace TTS.Source.Application.Features.Identity.Models
{
    public record UserRegisterCommand(string? Email, string FirstName, string LastName, string? CardId, string? PhoneNumber, string UserRole, string Password): IRequest<UserResponseModel>;

}