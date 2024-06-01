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


    public class GetShelfsQueryHandler : IRequestHandler<GetShelfsQuery, IList<ShelfDto>>
    {
        private readonly IShelfRepository _shelfRepository;

        public GetShelfsQueryHandler(IShelfRepository shelfRepository)
        {
            _shelfRepository = shelfRepository;
        }

        public async Task<IList<ShelfDto>> Handle(GetShelfsQuery request, CancellationToken cancellationToken)
        {
            var shelfs = await _shelfRepository.GetShelfs(cancellationToken);
            var shelfsDto = shelfs
                .Select(s => new ShelfDto
                {
                    Id = s.Id,
                    ShelfCode = s.ShelfCode,
                })
                .ToList();

            return shelfsDto;
        }
    }
}
