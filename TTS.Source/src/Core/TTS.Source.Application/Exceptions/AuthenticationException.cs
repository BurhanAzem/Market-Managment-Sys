using System.Net;

namespace TTS.Source.Application.Common.Exceptions
{
    public class AuthenticationException : TTSException
    {
        public AuthenticationException(string message) : base(message)
        {
            StatusCode = HttpStatusCode.Unauthorized;
        }
    }
}
