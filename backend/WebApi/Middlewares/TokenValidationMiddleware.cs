using System.IdentityModel.Tokens.Jwt;

public class TokenValidationMiddleware
{
    private readonly RequestDelegate _next;

    public TokenValidationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context, IUserService userService)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        if (string.IsNullOrEmpty(token))
        {
            await _next(context);
            return;
        }

        try
        {
            var handler = new JwtSecurityTokenHandler();

            if (handler.CanReadToken(token))
            {
                var jwtToken = handler.ReadJwtToken(token);

                var externalId = jwtToken.Claims.FirstOrDefault(c => c.Type == "sub" || c.Type == "oid")?.Value;

                if (!string.IsNullOrEmpty(externalId))
                {
                    var userId = await userService.GetUserIdByExternalIdAsync(externalId);

                    if (userId.HasValue)
                    {
                        context.Items["UserId"] = userId;
                        Console.WriteLine(userId);
                    }
                }
            }
        }
        catch
        {
        }

        await _next(context);
    }
}
