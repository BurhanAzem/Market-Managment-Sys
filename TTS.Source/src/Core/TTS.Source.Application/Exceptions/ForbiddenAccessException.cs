using System.Net;

namespace TTS.Source.Application.Common.Exceptions
{
    public class ForbiddenAccessException : TTSException
    {
        public ForbiddenAccessException(string message) : base(message)
        {
            StatusCode = HttpStatusCode.Forbidden;
        }
    }
}
