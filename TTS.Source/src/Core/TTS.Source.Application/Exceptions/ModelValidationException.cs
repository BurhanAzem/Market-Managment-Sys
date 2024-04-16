using FluentValidation.Results;
using System.Net;

namespace TTS.Source.Application.Common.Exceptions
{
    public class ModelValidationException : TTSException
    {
        public IDictionary<string, string[]> Errors { get; } = default!;

        public ModelValidationException() : base("One or more validation errors have occurred.")
        {
            Errors = new Dictionary<string, string[]>();
            StatusCode = HttpStatusCode.UnprocessableEntity;
        }

        public ModelValidationException(IEnumerable<ValidationFailure> errors) : this()
        {
            var failureGroups = errors.GroupBy(e => e.PropertyName, e => e.ErrorMessage);

            foreach (var failureGroup in failureGroups)
            {
                var propertyName = failureGroup.Key;
                var propertyFailures = failureGroup.ToArray();

                Errors.Add(propertyName, propertyFailures);
            }
        }
    }
}