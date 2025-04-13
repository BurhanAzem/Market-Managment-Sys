namespace TTS.Source.Persistance.RelationalDB.Identity.Options
{
    public class JwtOptions
    {
        public string Issuer { get; set; } = null!;
        public string Audience { get; set; } = null!;
        public string Secret { get; set; } = null!;
        public int ExpirationTimeInMinutes { get; set; }
    }
}
