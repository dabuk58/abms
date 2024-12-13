using Application.Common.Interfaces;
using Infrastructure.Persistence;
using Infrastructure.Persistence.Interceptors;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton(TimeProvider.System);
        services.AddScoped<IApplicationDbContext, ApplicationDbContext>();
        services.AddScoped<EntitySaveChangesInterceptor>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"))
            );


        return services;
    }
}
