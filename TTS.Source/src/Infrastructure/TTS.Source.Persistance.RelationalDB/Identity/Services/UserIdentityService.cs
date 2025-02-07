using EmailService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
using System;
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
        private readonly IJwtGeneratorService _jwtGeneratorService;
        public UserIdentityService(UserManager<User> userManager,
            IJwtGeneratorService jwtGeneratorService)
        {
            _userManager = userManager;
            _jwtGeneratorService = jwtGeneratorService;
        }

        public async Task<UserResponseModel> SignInAsync(UserLoginCommand userRequestModel)
        {
            // var user = await _userManager.FindByEmailAsync(userRequestModel.Email!);
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.CardId == userRequestModel.CardId);


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

            var token = await _jwtGeneratorService.GenerateToken(user);
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

            return new UserResponseModel(userDto, token);
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

            var token = await _jwtGeneratorService.GenerateToken(user);
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
            return new UserResponseModel(userDto, token);
        }

        public async Task<User?> GetUserByEmailAddressAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<User?> GetUserByPhoneNumberAsync(string phoneNumber)
        {
            return await _userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
        }

        public async Task<User?> GetUserByCardIdAsync(string cardId)
        {
            return await _userManager.Users.FirstOrDefaultAsync(u => u.CardId == cardId);
        }

        // public async Task<ForgotPasswordResponseModel> ForgotPasswordAsync(ForgotPasswordModel forgotPasswordModel)
        // {
        //     var user = await _userManager.FindByEmailAsync(forgotPasswordModel.Email);
        //     if (user == null)
        //         throw new NotFoundException("User not found");

        //     var token = await _userManager.GeneratePasswordResetTokenAsync(user);

        //     return new ForgotPasswordResponseModel(token, user.Email!);
        // }

        // public async Task<ResetPasswordResponseModel> ResetPasswordAsync(ResetPasswordRequestModel resetPasswordModel)
        // {

        //     var user = await _userManager.FindByEmailAsync(resetPasswordModel.Email);
        //     if (user == null)
        //         throw new BadRequestException("user not exists");

        //     var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPasswordModel.Token, resetPasswordModel.Password);
        //     if (!resetPassResult.Succeeded)
        //     {
        //         return new ResetPasswordResponseModel
        //         {
        //             Email = user.Email!,
        //             Token = resetPasswordModel.Token,
        //             Success = resetPassResult.Succeeded,
        //             Message = "Password reset failed"
        //         };
        //     }
        //     var token = await _userManager.GeneratePasswordResetTokenAsync(user);

        //     return new ResetPasswordResponseModel
        //     {
        //         Email = user.Email!,
        //         Token = token,
        //         Success = resetPassResult.Succeeded,
        //         Message = "Password reset successful"
        //     };
        // }
    }
}