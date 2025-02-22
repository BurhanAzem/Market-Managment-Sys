using System;
using Ardalis.GuardClauses;
using TTS.Source.Domain.Base;
using TTS.Source.Domain.Entities;
using TTS.Source.Domain.Shared;

namespace TTS.Source.Application.Dtos
{
    public class BaseSupplierDto
    {
       public string Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
    }
}
