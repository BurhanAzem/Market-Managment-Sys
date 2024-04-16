using MediatR;

namespace TTS.Source.Application.Features.Identity.Models
{
    public record UserResponseModel(Guid UserId, string Name, string Email, string Token) : IRequest<Guid>;
}