using Google.Apis.Auth;
using MediatR;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Features.Identity.Models;

namespace TTS.Source.Application.Features.Identity.Commands.Login
{
    public class UserGoogleLoginCommandHandler : IRequestHandler<UserGoogleLoginCommand, UserResponseModel>
    {
        private readonly IUserIdentityService _userIdentity;
        private readonly HttpClient _httpClient;

        public UserGoogleLoginCommandHandler(IUserIdentityService userIdentity)
        {
            _userIdentity = userIdentity;
            _httpClient = new HttpClient(); // Replace with DI in production
        }

        public async Task<UserResponseModel> Handle(UserGoogleLoginCommand request, CancellationToken cancellationToken)
        {
            await _userIdentity.LoginWithGoogleAsync(request.claimsPrincipal, request.userRole);



        }
    }
}
