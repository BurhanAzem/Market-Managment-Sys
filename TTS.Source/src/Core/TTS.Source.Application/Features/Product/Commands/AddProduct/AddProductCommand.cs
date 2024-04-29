using MediatR;
using TTS.Source.Application.Dtos;

namespace TTS.Source.Application.Features.Identity.Models
{
    public record AddProductCommand(ProductDto ProductDto) : IRequest<AddProductResponse>;

}