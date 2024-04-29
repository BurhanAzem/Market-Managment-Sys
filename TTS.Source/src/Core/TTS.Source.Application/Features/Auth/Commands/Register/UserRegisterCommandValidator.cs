// namespace TTS.Source.Application.Features.Identity.Commands.Register;

// using FluentValidation;
// using TTS.Source.Application.Features.Identity.Models;
// using TTS.Source.Domain.Shared;

// public class EmployeeRegisterCommandValidator : AbstractValidator<EmployeeRegisterCommand>
// {
//     public EmployeeRegisterCommandValidator()
//     {
//         RuleFor(u => u.UserRegisterRequestModel.Name)
//             .MinimumLength(Constants.MemberConstants.MinNameLength)
//             .MaximumLength(Constants.MemberConstants.MaxNameLength)
//             .NotEmpty();

//         RuleFor(u => u.UserRegisterRequestModel.Email)
//             .NotEmpty()
//             .EmailAddress();

//         RuleFor(u => u.UserRegisterRequestModel.Password).NotEmpty().WithMessage("Your password cannot be empty")
//             .MinimumLength(8).WithMessage("Your password length must be at least 8.")
//             .MaximumLength(16).WithMessage("Your password length must not exceed 16.");
//     }
// }