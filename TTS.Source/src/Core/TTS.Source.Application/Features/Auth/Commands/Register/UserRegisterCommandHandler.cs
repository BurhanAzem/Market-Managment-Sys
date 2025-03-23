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
            if (request.CardId != "")
            {
                user = await _userIdentity.GetUserByCardIdAsync(request.CardId);
                if (user != null && user.Discriminator == request.UserRole)
                {

                    throw new BadRequestException($"user already exists with1 {request.CardId} {user}");
                }
            }
            else if (request.PhoneNumber != null)
            {
                user = await _userIdentity.GetUserByPhoneNumberAsync(request.PhoneNumber);
                if (user != null && user.Discriminator == request.UserRole)
                {

                    throw new BadRequestException($"user already exists with2 {request.PhoneNumber}  {user}");
                }
            }
            else if (request.Email != null)
            {
                user = await _userIdentity.GetUserByEmailAddressAsync(request.Email);
                if (user != null && user.Discriminator == request.UserRole)
                {
                    throw new BadRequestException($"user already exists with3 {request.Email} {user}");
                }

            }
            else
            {
                throw new BadRequestException("email or phone number or card id must be provided.");
            }



            User newUser = null;
            switch (request.UserRole)
            {
                case "Employee":
                    newUser = new Employee(request.Email,
                    request.CardId, request.PhoneNumber, request.FirstName, request.LastName);
                    break;

                case "Customer":
                    newUser = new Customer(request.Email,
                        request.CardId, request.PhoneNumber, request.FirstName, request.LastName);
                    break;
                case "Manager":
                    newUser = new Manager(request.Email,
                                            request.CardId, request.PhoneNumber, request.FirstName, request.LastName);
                    break;
            }
            UserResponseModel response;


            response = await _userIdentity.SignUpAsync(newUser, request.Password);

            return response;
        }
    }
}