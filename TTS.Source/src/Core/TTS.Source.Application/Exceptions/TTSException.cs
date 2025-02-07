using System.Net;

namespace TTS.Source.Application.Common.Exceptions
{
    public class TTSException : Exception
    {
        public HttpStatusCode StatusCode { get; set; }

        protected TTSException(string message) : base(message: message)
        {

        }
    }
}
