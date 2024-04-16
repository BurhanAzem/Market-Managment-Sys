using Mapster;
using MediatR;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Common.Models;
using TTS.Source.Application.Features.Comments.Models;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Features.Comments.Commands.Create
{
    public record CommentCreateCommand(CommentCreateModel CommentCreateModel) : IRequest<CommentResponseModel>;

    public class CommentCreateCommandHandler : CurrentMember, IRequestHandler<CommentCreateCommand, CommentResponseModel>
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IMemberRepository _memberRepository;
        public CommentCreateCommandHandler(ITicketRepository ticketRepository,
            IMemberRepository memberRepository, ICurrentMemberProvider currentMemberProvider) : base(currentMemberProvider)
        {
            _ticketRepository = ticketRepository;
            _memberRepository = memberRepository;
        }

        public async Task<CommentResponseModel> Handle(CommentCreateCommand request, CancellationToken cancellationToken)
        {
            var ticket = await _ticketRepository.FindAsync(request.CommentCreateModel.TicketId, cancellationToken);
            if (ticket == null)
            {
                throw new NotFoundException("Ticket Not Found");
            }
            var member = await _memberRepository.FindAsync(CurrentMemberId, cancellationToken);

            if (member == null)
            {
                throw new NotFoundException("You're not a member");
            }


            var comment = new Comment(member, request.CommentCreateModel.Content);

            ticket.AddComment(comment);

            await _ticketRepository.SaveAsync(cancellationToken);
            return comment.Adapt<CommentResponseModel>();
        }
    }
}
