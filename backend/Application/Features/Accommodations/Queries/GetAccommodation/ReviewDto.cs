namespace Application.Features.Accommodations.Queries.GetAccommodation;
public class ReviewDto
{
    public int Id { get; set; }
    public required int Rating { get; set; }
    public string? ReviewText { get; set; }
    public int UserId { get; set; }
}
