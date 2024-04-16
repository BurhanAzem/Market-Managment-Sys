using System.Net;

namespace TTS.Source.Application.Common.Exceptions
{
    public class NotFoundException : TTSException
    {
        public NotFoundException(string message) : base(message)
        {
            message = message + " not found";
            StatusCode = HttpStatusCode.NotFound;
        }
    }
}
