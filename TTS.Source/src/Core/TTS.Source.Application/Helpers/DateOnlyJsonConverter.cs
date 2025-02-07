using System.Text.Json.Serialization;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;
using TTS.Source.Application.Common.Exceptions;

namespace TTS.Source.Application.Helpers
{
    public sealed class DateOnlyJsonConverter : JsonConverter<DateOnly>
    {
        public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            try
            {
                var dateString = reader.GetString();
                DateTime date;
                if (DateTime.TryParse(dateString, out date))
                {
                    return DateOnly.FromDateTime(date);
                }
                else
                {
                    throw new ModelValidationException();
                }
            }
            catch (Exception)
            {
                return default;
            }
        }

        public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
        {
            var isoDate = value.ToString("O");
            writer.WriteStringValue(isoDate);
        }
    }
}
