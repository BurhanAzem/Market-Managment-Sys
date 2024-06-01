using MediatR;
using Microsoft.EntityFrameworkCore;

namespace TTS.Source.Application.Common.Models
{
    public class BaseCommandResponse : IRequest<Guid>
    {
        public BaseCommandResponse(Guid id, bool success, string message) 
        {
            Id = id;
            Success = success;
            Message = message;
        }
        public Guid? Id { get; set; }
        public bool? Success { get; set; } = true;
        public string? Message { get; set; }
    }
}