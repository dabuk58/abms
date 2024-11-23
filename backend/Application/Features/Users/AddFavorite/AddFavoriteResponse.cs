namespace Application.Features.Users.AddFavorite;
public class AddFavoriteResponse
{
    public bool Success { get; set; }
    public string Message { get; set; }

    public AddFavoriteResponse(bool success, string message)
    {
        Success = success;
        Message = message;
    }
}
