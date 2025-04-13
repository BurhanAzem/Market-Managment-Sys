using Authentication.Application.Abstracts;
using EmailService;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
using System;
using System.Security.Claims;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Common.Models;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Persistance.RelationalDB.Identity.Services
{
    public class UserIdentityService : IUserIdentityService
    {
        private readonly UserManager<User> _userManager;
        private readonly IAuthTokenProcessor _authTokenProcessor;

        public UserIdentityService(UserManager<User> userManager,
             IAuthTokenProcessor authTokenProcessor)
        {
            _userManager = userManager;
            _authTokenProcessor = _authTokenProcessor;
        }

        public async Task<UserResponseModel> SignInAsync(UserLoginCommand userRequestModel)
        {
            // var user = await _userManager.FindByEmailAsync(userRequestModel.Email!);
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.CardId == userRequestModel.CardId || u.Email == userRequestModel.Email || u.PhoneNumber == userRequestModel.PhoneNumber && u.Discriminator == userRequestModel.UserRole);


            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            var passwordValid = await _userManager.CheckPasswordAsync(
                user,
                userRequestModel.Password);

            if (!passwordValid)
            {
                throw new AuthenticationException("Invalid credentials");
            }

            var token = _authTokenProcessor.GenerateJwtToken(user);
            UserDto userDto = new UserDto()
            {
                Id = user.Id,
                CreatedDate = user.CreatedDate,
                CardId = user.CardId,
                Discriminator = user.Discriminator,
                ImagePath = user.ImagePath,
                BirthDate = user.BirthDate,
                UserName = user.UserName,
                NormalizedUserName = user.NormalizedUserName,
                Email = user.Email,
                NormalizedEmail = user.NormalizedEmail,
                EmailConfirmed = user.EmailConfirmed,
                SecurityStamp = user.SecurityStamp,
                ConcurrencyStamp = user.ConcurrencyStamp,
                PhoneNumber = user.PhoneNumber,
                PhoneNumberConfirmed = user.PhoneNumberConfirmed,
                TwoFactorEnabled = user.TwoFactorEnabled,
                LockoutEnd = user.LockoutEnd,
                LockoutEnabled = user.LockoutEnabled,
                AccessFailedCount = user.AccessFailedCount,

            };

            return new UserResponseModel(userDto, token.jwtToken);
        }

        public async Task<UserResponseModel> SignUpAsync(User user, string password)
        {
            //  var identityUser = new IdentityUser(user.UserName);

            var identityResult = await _userManager.CreateAsync(
                user,
                password);

            if (!identityResult.Succeeded)
            {
                var errors = identityResult.Errors.Select(e => e.Description);
                throw new BadRequestException(string.Join(", ", errors));
            }

            var token = _authTokenProcessor.GenerateJwtToken(user);
            UserDto userDto = new UserDto()
            {
                Id = user.Id,
                CreatedDate = user.CreatedDate,
                CardId = user.CardId,
                Discriminator = user.Discriminator,
                ImagePath = user.ImagePath,
                BirthDate = user.BirthDate,
                UserName = user.UserName,
                NormalizedUserName = user.NormalizedUserName,
                Email = user.Email,
                NormalizedEmail = user.NormalizedEmail,
                EmailConfirmed = user.EmailConfirmed,
                SecurityStamp = user.SecurityStamp,
                ConcurrencyStamp = user.ConcurrencyStamp,
                PhoneNumber = user.PhoneNumber,
                PhoneNumberConfirmed = user.PhoneNumberConfirmed,
                TwoFactorEnabled = user.TwoFactorEnabled,
                LockoutEnd = user.LockoutEnd,
                LockoutEnabled = user.LockoutEnabled,
                AccessFailedCount = user.AccessFailedCount,

            };
            return new UserResponseModel(userDto, token.jwtToken);
        }

        public async Task<UserResponseModel> SignInWithGoogleAsync(UserLoginCommand userRequestModel)
        {
            // var user = await _userManager.FindByEmailAsync(userRequestModel.Email!);
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.CardId == userRequestModel.CardId || u.Email == userRequestModel.Email || u.PhoneNumber == userRequestModel.PhoneNumber && u.Discriminator == userRequestModel.UserRole);


            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            var passwordValid = await _userManager.CheckPasswordAsync(
                user,
                userRequestModel.Password);

            if (!passwordValid)
            {
                throw new AuthenticationException("Invalid credentials");
            }

            var token = _authTokenProcessor.GenerateJwtToken(user);
            UserDto userDto = new UserDto()
            {
                Id = user.Id,
                CreatedDate = user.CreatedDate,
                CardId = user.CardId,
                Discriminator = user.Discriminator,
                ImagePath = user.ImagePath,
                BirthDate = user.BirthDate,
                UserName = user.UserName,
                NormalizedUserName = user.NormalizedUserName,
                Email = user.Email,
                NormalizedEmail = user.NormalizedEmail,
                EmailConfirmed = user.EmailConfirmed,
                SecurityStamp = user.SecurityStamp,
                ConcurrencyStamp = user.ConcurrencyStamp,
                PhoneNumber = user.PhoneNumber,
                PhoneNumberConfirmed = user.PhoneNumberConfirmed,
                TwoFactorEnabled = user.TwoFactorEnabled,
                LockoutEnd = user.LockoutEnd,
                LockoutEnabled = user.LockoutEnabled,
                AccessFailedCount = user.AccessFailedCount,

            };

            return new UserResponseModel(userDto, token.jwtToken);
        }

        public async Task<UserResponseModel> SignInWithGooglePayloadAsync(string email, string? name, string? picture, string userRole)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                user = new User(email, name, true, userRole);

                var result = await _userManager.CreateAsync(user);
                if (!result.Succeeded)
                {
                    throw new BadRequestException(string.Join(", ", result.Errors.Select(e => e.Description)));
                }
            }

            var token = _authTokenProcessor.GenerateJwtToken(user);

            var userDto = new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Discriminator = user.Discriminator,
                UserName = user.UserName,
                ImagePath = user.ImagePath,
                CreatedDate = user.CreatedDate
                // Fill more fields if needed
            };

            return new UserResponseModel(userDto, token.jwtToken);
        }


        public async Task LoginWithGoogleAsync(ClaimsPrincipal? claimsPrincipal, string userRole)
        {
            if (claimsPrincipal == null)
                throw new Exception("Google ClaimsPrincipal is null");

            var email = claimsPrincipal.FindFirstValue(ClaimTypes.Email);
            var googleId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            var givenName = claimsPrincipal.FindFirstValue(ClaimTypes.GivenName) ?? "";
            var surname = claimsPrincipal.FindFirstValue(ClaimTypes.Surname) ?? "";

            if (email == null)
                throw new Exception("Google Email is null");

            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                var newUser = new User
                (
                    email,
                    givenName, true,

    userRole

                );

                var result = await _userManager.CreateAsync(newUser);

                // if (!result.Succeeded)
                // {
                //     throw new EventWaitHandle("Google"+
                //         $"Unable to create user: {string.Join(", ", result.Errors.Select(x => x.Description))}");
                // }

                user = newUser;
            }

            var loginInfo = new UserLoginInfo("Google", googleId ?? Guid.NewGuid().ToString(), "Google");
            await _userManager.AddLoginAsync(user, loginInfo);

            var (jwtToken, expirationDateInUtc) = _authTokenProcessor.GenerateJwtToken(user);
            var refreshToken = _authTokenProcessor.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiresAtUtc = DateTime.UtcNow.AddDays(7);
            await _userManager.UpdateAsync(user);

            _authTokenProcessor.WriteAuthTokenAsHttpOnlyCookie("ACCESS_TOKEN", jwtToken, expirationDateInUtc);
            _authTokenProcessor.WriteAuthTokenAsHttpOnlyCookie("REFRESH_TOKEN", refreshToken, user.RefreshTokenExpiresAtUtc);
        }


        public async Task<User?> GetUserByEmailAddressAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<User?> GetUserByPhoneNumberAsync(string phoneNumber)
        {
            return await _userManager.Users.SingleOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
        }

        public async Task<User?> GetUserByCardIdAsync(string cardId)
        {
            return await _userManager.Users.SingleOrDefaultAsync(u => u.CardId == cardId);
        }


    }
}