using TTS.Source.Application.Dtos;

namespace TTS.Source.Application.Features.Identity.Models
{
    public class SupplierDto : BaseSupplierDto
    {
        public Guid Id { get; set; }
        public DateTime? CreatedDate { get; set; }


    }
}