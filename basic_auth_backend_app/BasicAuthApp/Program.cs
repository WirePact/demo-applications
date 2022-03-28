var builder = WebApplication.CreateBuilder(args);
builder.WebHost.ConfigureKestrel(s =>
{
    var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
    s.ListenAnyIP(Convert.ToInt32(port));
});

builder.Services.AddRazorPages();

var app = builder.Build();

app.MapRazorPages();

await app.RunAsync();
