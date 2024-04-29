using System;
using TTS.Source.Domain.Base;

namespace TTS.Source.Application.Dtos
{
    public class DiscountDto 
    {

        public decimal  Amount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }
}
