using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BasicAuthApp.Pages;

public class Index : PageModel
{
    public string? ApiUrl => Environment.GetEnvironmentVariable("API_URL");
    public string? Username => Environment.GetEnvironmentVariable("AUTH_USER");
    public string? Password => Environment.GetEnvironmentVariable("AUTH_PASS");

    [BindProperty] public RequestForm ApiCall { get; set; } = new("", "", "");

    [TempData] public string? Result { get; set; }

    [TempData] public string? Error { get; set; }

    public async Task<IActionResult> OnPostAsync()
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.Get, ApiCall.ApiUrl);
        request.Headers.Authorization = new AuthenticationHeaderValue("Basic",
            Convert.ToBase64String(Encoding.ASCII.GetBytes($"{ApiCall.Username}:{ApiCall.Password}")));

        try
        {
            var result = await client.SendAsync(request);

            if (result.StatusCode >= (HttpStatusCode) 300)
            {
                Error = $"{result.StatusCode} - {result.ReasonPhrase}";
            }
            else
            {
                var parsed = JsonSerializer.Deserialize<dynamic>(await result.Content.ReadAsStringAsync());
                Result = JsonSerializer.Serialize(parsed, new JsonSerializerOptions
                {
                    WriteIndented = true,
                });
            }
        }
        catch (Exception e)
        {
            Error = e.ToString();
        }

        return RedirectToPage();
    }
}

public record RequestForm(string ApiUrl, string Username, string Password);
