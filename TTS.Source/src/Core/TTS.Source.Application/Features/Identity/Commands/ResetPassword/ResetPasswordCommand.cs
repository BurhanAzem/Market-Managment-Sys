// using EmailService;
// using MediatR;
// using Org.BouncyCastle.Asn1.Ocsp;
// using System;
// using System.Diagnostics;
// using TTS.Source.Application.Common.Contracts.Identity;
// using TTS.Source.Application.Common.Contracts.Persistance;
// using TTS.Source.Application.Common.Exceptions;
// using TTS.Source.Application.Features.Identity.Models;

// namespace TTS.Source.Application.Features.Identity.Commands.Login
// {
//     public record ResetPasswordCommand(ResetPasswordRequestModel ResetPasswordModel) : IRequest<ResetPasswordResponseModel>;
//     public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, ResetPasswordResponseModel>
//     {
//         private readonly IUserIdentityService _userIdentity;
//         private readonly IMemberRepository _memberRepository;
//         private readonly IEmailSender _emailSender;

//         public ResetPasswordCommandHandler(IUserIdentityService userIdentity,
//                                   IMemberRepository memberRepository, IEmailSender emailSender)
//         {
//             _userIdentity = userIdentity;
//             _memberRepository = memberRepository;
//             _emailSender = emailSender;

//         }


//         public async Task<ResetPasswordResponseModel> Handle(
//             ResetPasswordCommand request,
//             CancellationToken cancellationToken)
//         {
//             var user = await _userIdentity.GetUserByEmailAddressAsync(request.ResetPasswordModel.Email);
            
//             var response = await _userIdentity.ResetPasswordAsync(request.ResetPasswordModel);
//             return response;
//         }
//     }
// }