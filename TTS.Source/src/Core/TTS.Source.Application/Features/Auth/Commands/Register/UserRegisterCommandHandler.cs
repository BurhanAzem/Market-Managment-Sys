using MediatR;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Domain.Entities;
using TTS.Source.Application.Common.Exceptions;

namespace TTS.Source.Application.Features.Identity.Commands.Register
{
    public class UserRegisterCommandHandler : IRequestHandler<UserRegisterCommand, UserResponseModel>
    {
        private readonly IUserIdentityService _userIdentity;

        public UserRegisterCommandHandler(IUserIdentityService userIdentity)
        {
            _userIdentity = userIdentity;
        }

        public async Task<UserResponseModel> Handle(
            UserRegisterCommand request,
            CancellationToken cancellationToken)
        {
            User user;
            if (request.CardId != null)
            {
                user = await _userIdentity.GetUserByCardIdAsync(request.CardId);
                if (user != null)
                {
                    throw new BadRequestException("user already exists");
                }
            }
            else if (request.PhoneNumber != null)
            {
                user = await _userIdentity.GetUserByPhoneNumberAsync(request.PhoneNumber);
                if (user == null)
                {
                    throw new BadRequestException("user already exists");
                }
            }
            else if (request.Email != null)
            {
                user = await _userIdentity.GetUserByEmailAddressAsync(request.Email);
                if (user == null)
                {
                    throw new BadRequestException("user already exists");
                }

            }
            else
            {
                throw new BadRequestException("email or phone number or card id must be provided.");
            }
            
            User userRe = null;
            switch (request.UserRole)
            {
                case "Employee":
                    userRe = new Employee(request.Email, request.UserName,
                    request.CardId, request.PhoneNumber);
                    break;

                case "Customer":
                    userRe = new Customer(request.Email, request.UserName,
                        request.CardId, request.PhoneNumber);
                    break;
                case "Manager":
                    userRe = new Manager(request.Email, request.UserName,
                                            request.CardId, request.PhoneNumber);
                    break;
            }
            UserResponseModel response;

            if (userRe != null)
            {
                response = await _userIdentity.SignUpAsync(userRe, request.Password);
                // Handle the response here
            }
            else
            {
                throw new BadRequestException("You entered invalid user type");
            }

            return response;
        }
    }
}