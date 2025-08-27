using Application;
using Infrastructure;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using QualityManagement.WebApi.Features;
using Serilog;
using WebApi.Features;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
    options.AddPolicy(
        "AllowFront",
        builder =>
            builder
                .WithOrigins(
                    "http://localhost:4200",
                    "https://dabuk58.github.io",
                    "https://dabuk58.github.io/abms"
                )
                .AllowAnyHeader()
                .AllowAnyOrigin()
    )
);

builder.Services.AddApplication().AddInfrastructure(builder.Configuration);

builder.Services.AddHttpContextAccessor();

builder.Services.AddTransient<IUserService, UserService>();

builder.Host.UseSerilog(
    (context, configuration) => configuration.ReadFrom.Configuration(context.Configuration)
);

var app = builder.Build();

if (app.Environment.IsProduction())
{
    using var scope = app.Services.CreateScope();
    var db =
        scope.ServiceProvider.GetRequiredService<Infrastructure.Persistence.ApplicationDbContext>();
    db.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFront");

app.UseSerilogRequestLogging();

app.UseMiddleware<TokenValidationMiddleware>();

app.UseHttpsRedirection();

app.MapGet("/", () => Results.Ok("Backend is running 🚀"));
app.MapAccommodationsEndpoints();
app.MapUsersEndpoints();
app.MapBookingsEndpoints();

app.Run();
