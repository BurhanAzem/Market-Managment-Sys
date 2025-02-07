using Application.Exceptions;
using System.Linq;
using System.Text.Json;

using System.Net;
using TTS.Source.Application.Common.Exceptions;
using NotFoundException = TTS.Source.Application.Common.Exceptions.NotFoundException;

namespace TTS.Source.API.Middleware
{
    public sealed class ExceptionHandlingMiddleware : IMiddleware
    {
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(ILogger<ExceptionHandlingMiddleware> logger) => _logger = logger;

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);

                await HandleExceptionAsync(context, e);
            }
        }
        private static async Task HandleExceptionAsync(HttpContext httpContext, Exception exception)
        {
            httpContext.Response.ContentType = "application/json";

            httpContext.Response.StatusCode = exception switch
            {
                BadRequestException or ValidationException => StatusCodes.Status400BadRequest,
                NotFoundException => StatusCodes.Status404NotFound,
                _ => StatusCodes.Status500InternalServerError
            };

            var errors = Array.Empty<ApiError>();

            if (exception is ValidationException validationException)
            {
                errors = validationException.Errors
                    .SelectMany(
                        kvp => kvp.Value,
                        (kvp, value) => new ApiError(kvp.Key, value))
                    .ToArray();
            }

            var response = new
            {
                status = httpContext.Response.StatusCode,
                message = exception.Message,
                errors
            };

            await httpContext.Response.WriteAsync(JsonSerializer.Serialize(response));
        }

        private record ApiError(string PropertyName, string ErrorMessage);
    }

}
