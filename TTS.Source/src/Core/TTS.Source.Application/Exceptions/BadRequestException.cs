using System.Net;

namespace TTS.Source.Application.Common.Exceptions
{
    public class BadRequestException : TTSException
    {
        public BadRequestException(string message) : base(message)
        {
            StatusCode = HttpStatusCode.BadRequest;
        }
    }
}


