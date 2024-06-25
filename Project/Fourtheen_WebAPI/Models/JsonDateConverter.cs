using System;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

public class JsonDateConverter : JsonConverter<DateTime>
{
    private readonly string _format = "dd/MM/yyyy";

    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var dateString = reader.GetString();
        return DateTime.ParseExact(dateString, _format, CultureInfo.InvariantCulture);
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(_format));
    }
}
