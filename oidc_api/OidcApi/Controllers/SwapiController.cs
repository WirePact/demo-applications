using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace OidcApi.Controllers;

[Authorize]
[Route("swapi")]
public class SwapiController : ControllerBase
{
    private static readonly HttpClient Client = new() {BaseAddress = new Uri("https://swapi.dev/api/")};

    [HttpGet("people")]
    public async Task<Result<Person>> GetPeople()
    {
        var response = await Client.GetAsync("people");
        var result = await response.EnsureSuccessStatusCode().Content.ReadFromJsonAsync<Result<Person>>();

        if (result == null)
        {
            return new(new List<Person>());
        }

        return result;
    }
}

public record Result<T>(IList<T> Results);

public record Person(string Name, string Gender)
{
    [JsonPropertyName("hair_color")] public string HairColor { get; init; } = string.Empty;

    [JsonPropertyName("eye_color")] public string EyeColor { get; init; } = string.Empty;

    [JsonPropertyName("birth_year")] public string BirthYear { get; init; } = string.Empty;
}
