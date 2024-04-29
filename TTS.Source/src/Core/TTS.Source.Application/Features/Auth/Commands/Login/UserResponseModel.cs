using MediatR;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Features.Identity.Models
{
    public record UserResponseModel(UserDto UserDto, string Token) : IRequest<Guid>;
}