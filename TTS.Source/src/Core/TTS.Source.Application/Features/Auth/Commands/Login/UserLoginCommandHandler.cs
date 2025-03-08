using MediatR;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Features.Identity.Commands.Login
{
    public class UserLoginCommandHandler : IRequestHandler<UserLoginCommand, UserResponseModel>
    {
        private readonly IUserIdentityService _userIdentity;
        public UserLoginCommandHandler(IUserIdentityService userIdentity)
        {
            _userIdentity = userIdentity;
        }


        public async Task<UserResponseModel> Handle(
            UserLoginCommand request,
            CancellationToken cancellationToken)
        {
            User user;
            if (request.CardId != null)
            {
                user = await _userIdentity.GetUserByCardIdAsync(request.CardId);
                if (user == null)
                {
                    throw new BadRequestException("user not exists1");
                }
            }
            else if (request.PhoneNumber != null)
            {
                user = await _userIdentity.GetUserByPhoneNumberAsync(request.PhoneNumber);
                if (user == null)
                {
                    throw new BadRequestException("user not exists2");
                }
            }
            else if (request.Email != null)
            {
                user = await _userIdentity.GetUserByEmailAddressAsync(request.Email);
                if (user == null)
                {
                    throw new BadRequestException("user not exists3");
                }

            }
            else
            {
                throw new BadRequestException("email or phone number or card id must be provided.");
            }

            var response = await _userIdentity.SignInAsync(request);
            return response;
        }
    }
}