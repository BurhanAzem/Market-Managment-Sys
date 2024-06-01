using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TTS.Source.Application.Dtos;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Application.Features.Identity.Models;

namespace TTS.Source.Application.Features.Projects.Queries
{


    public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, IList<CategoryDto>>
    {
        private readonly ICategoryRepository _categoryRepository;

        public GetCategoriesQueryHandler(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<IList<CategoryDto>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
        {
            var categories = await _categoryRepository.GetCategories(cancellationToken);
            var categoriesDto = categories
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description 
                })
                .ToList();

            return categoriesDto;
        }
    }
}
