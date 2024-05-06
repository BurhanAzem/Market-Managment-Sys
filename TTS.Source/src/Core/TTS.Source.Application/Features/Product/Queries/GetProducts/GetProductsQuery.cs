using MediatR;
using TTS.Source.Application.Dtos;
using TTS.Source.Domain.Entities;

namespace TTS.Source.Application.Features.Identity.Models
{
    public record GetProductsQuery(string? ProductName, string? CategoryName, string? SelfCode, string? SupplierName,
      int PageNumber = 1, int PageSize = 10) : IRequest<GetProductsResponse>;

}

