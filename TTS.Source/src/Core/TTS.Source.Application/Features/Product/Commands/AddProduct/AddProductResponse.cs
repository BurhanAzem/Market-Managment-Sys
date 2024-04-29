using MediatR;
using TTS.Source.Application.Dtos;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Features.Identity.Models
{
    public record AddProductResponse(Guid Id, bool Success, string Message) : IRequest<Guid>;
}
