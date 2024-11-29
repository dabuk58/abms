public class DateRangeDto
{
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }

    public DateRangeDto(DateOnly startDate, DateOnly endDate)
    {
        StartDate = startDate;
        EndDate = endDate;
    }
}
