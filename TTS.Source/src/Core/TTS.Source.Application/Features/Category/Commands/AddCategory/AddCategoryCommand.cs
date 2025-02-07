using MediatR;
using TTS.Source.Application.Common.Models;
using TTS.Source.Application.Dtos;

namespace TTS.Source.Application.Features.Identity.Models
{
    public record AddCategoryCommand(AddCategoryDto CategoryDto) : IRequest<BaseCommandResponse>;

}