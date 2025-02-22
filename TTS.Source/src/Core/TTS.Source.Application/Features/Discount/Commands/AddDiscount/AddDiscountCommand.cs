using MediatR;
using TTS.Source.Application.Common.Models;
using TTS.Source.Application.Dtos;

namespace TTS.Source.Application.Features.Identity.Models
{
    public record AddDiscountCommand(AddDiscountDto DiscountDto) : IRequest<BaseCommandResponse>;

}