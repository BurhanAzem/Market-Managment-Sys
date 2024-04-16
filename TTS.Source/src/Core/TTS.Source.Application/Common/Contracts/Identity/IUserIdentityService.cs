using TTS.Source.Application.Common.Models;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Common.Contracts.Identity
{
    public interface IUserIdentityService
    {
        Task<User?> GetUserByEmailAddressAsync(string email);
        Task<User?> GetUserByPhoneNumberAsync(string phoneNumber);
        Task<User?> GetUserByCardIdAsync(string cardId);


        Task<UserResponseModel> SignUpAsync(User user, string password);
        Task<UserResponseModel> SignInAsync(UserLoginCommand userLoginCommand);
        // Task<ForgotPasswordResponseModel> ForgotPasswordAsync(ForgotPasswordModel forgotPasswordModel);
        // Task<ResetPasswordResponseModel> ResetPasswordAsync(ResetPasswordRequestModel resetPasswordModel);

    }
}