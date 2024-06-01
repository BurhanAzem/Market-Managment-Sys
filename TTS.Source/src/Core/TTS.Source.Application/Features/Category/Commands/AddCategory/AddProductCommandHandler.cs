using MediatR;
using TTS.Source.Application.Features.Identity.Models;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Domain.Entities;
using TTS.Source.Application.Common.Exceptions;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Common.Models;

namespace TTS.Source.Application.Features.Identity.Commands.Register
{
    public class AddCategoryCommandHandler : IRequestHandler<AddCategoryCommand, BaseCommandResponse>
    {
        private readonly IUserIdentityService _userIdentity;
        private readonly ICategoryRepository _categoryRepository;

        public AddCategoryCommandHandler(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<BaseCommandResponse> Handle(
            AddCategoryCommand request,
            CancellationToken cancellationToken)
        {
            var id = await _categoryRepository.AddCategory(request.CategoryDto, cancellationToken);
            BaseCommandResponse response = new BaseCommandResponse(id, true, "Category Added successfully");
            return response;
        }
    }
}