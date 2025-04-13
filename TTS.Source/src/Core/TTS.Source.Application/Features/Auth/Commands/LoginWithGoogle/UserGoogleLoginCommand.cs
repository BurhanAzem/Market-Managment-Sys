// Application/Features/Identity/Models/UserGoogleLoginCommand.cs
using System.Security.Claims;
using MediatR;

namespace TTS.Source.Application.Features.Identity.Models
{
    public record UserGoogleLoginCommand(ClaimsPrincipal claimsPrincipal, string userRole) : IRequest;
}
