using Mapster;
using MediatR;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Models;
using TTS.Source.Application.Features.Projects.Models;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Domain.Shared;
using TTS.Source.Application.Features.Comments.Models;

namespace TTS.Source.Application.Features.Comments.Commands.Edit
{
    public record CommentEditCommand(CommentEditModel CommentEditModel) : IRequest<CommentResponseModel>;

    public class CommentEditCommandHandler : CurrentMember, IRequestHandler<CommentEditCommand, CommentResponseModel>
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IMemberRepository _memberRepository;

        public CommentEditCommandHandler(ICommentRepository commentRepository, IMemberRepository memberRepository, ICurrentMemberProvider currentUserProvider)
            : base(currentUserProvider)
        {
            _commentRepository = commentRepository;
            _memberRepository = memberRepository;

        }
        public async Task<CommentResponseModel> Handle(
            CommentEditCommand request,
            CancellationToken cancellationToken)
        {
            var memberExists = await _memberRepository.ExistsAsync(m => m.Id == CurrentMemberId, cancellationToken);

            if (!memberExists)
            {
                throw new NotFoundException("You're not a member");
            }

            var comment = await _commentRepository.FindAsync(request.CommentEditModel.CommentId, cancellationToken);

            if (comment == null)
            {
                throw new NotFoundException("Comment not found.");
            }
            if (comment.MemberId != CurrentMemberId)
            {
                throw new UnauthorizedAccessException("You can't edit this comment");
            }

            comment.Update(request.CommentEditModel.Content);

            var result = await _commentRepository.UpdateAsync(comment, cancellationToken);

            return result.Adapt<CommentResponseModel>();
        }
    }
}