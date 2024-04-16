// using EmailService;
// using MediatR;
// using TTS.Source.Application.Common.Contracts.Identity;
// using TTS.Source.Application.Common.Contracts.Persistance;
// using TTS.Source.Application.Features.Identity.Models;

// namespace TTS.Source.Application.Features.Identity.Commands.Login
// {
//     public record ForgotPasswordCommand(ForgotPasswordModel ForgotPasswordModel) : IRequest<ForgotPasswordResponseModel>;
//     public class ForgetPasswordCommandHandler : IRequestHandler<ForgotPasswordCommand, ForgotPasswordResponseModel>
//     {
//         private readonly IUserIdentityService _userIdentity;
//         private readonly IMemberRepository _memberRepository;
//         private readonly IEmailSender _emailSender;

//         public ForgetPasswordCommandHandler(IUserIdentityService userIdentity,
//                                   IMemberRepository memberRepository, IEmailSender emailSender)
//         {
//             _userIdentity = userIdentity;
//             _memberRepository = memberRepository;
//             _emailSender = emailSender;

//         }


//         public async Task<ForgotPasswordResponseModel> Handle(
//             ForgotPasswordCommand request,
//             CancellationToken cancellationToken)
//         {
//             var response = await _userIdentity.ForgotPasswordAsync(request.ForgotPasswordModel);
//             return response;
//         }
//     }
// }