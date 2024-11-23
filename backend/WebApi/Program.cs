using Application;
using Infrastructure;
using QualityManagement.WebApi.Features;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => options.AddPolicy("AllowAngularApp",
    builder => builder.WithOrigins("http://localhost::4200")
    .AllowAnyHeader()
    .AllowAnyOrigin()));

builder.Services
    .AddApplication()
    .AddInfrastructure(builder.Configuration);

builder.Services.AddTransient<IUserService, UserService>();

builder.Host.UseSerilog((context, configuration) =>
    configuration.ReadFrom.Configuration(context.Configuration));

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngularApp");

app.UseSerilogRequestLogging();

app.UseMiddleware<TokenValidationMiddleware>();

app.UseHttpsRedirection();

app.MapAccommodationsEndpoints();
app.MapUsersEndpoints();

app.Run();
