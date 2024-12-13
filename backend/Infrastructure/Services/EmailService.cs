using Microsoft.Extensions.Configuration;
using MimeKit;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        var email = new MimeMessage();
        email.From.Add(new MailboxAddress("BedFind", _configuration["EmailSettings:Sender"]));
        email.To.Add(MailboxAddress.Parse(to));
        email.Subject = subject;

        email.Body = new TextPart("html")
        {
            Text = body
        };

        using var smtp = new MailKit.Net.Smtp.SmtpClient();
        await smtp.ConnectAsync(_configuration["EmailSettings:SmtpServer"], int.Parse(_configuration["EmailSettings:Port"]), MailKit.Security.SecureSocketOptions.StartTls);
        await smtp.AuthenticateAsync(_configuration["EmailSettings:Sender"], _configuration["EmailSettings:Password"]);
        await smtp.SendAsync(email);
        await smtp.DisconnectAsync(true);
    }
}