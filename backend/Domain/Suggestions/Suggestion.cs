using Domain.Common.Enums;

namespace Domain.Suggestions;
public class Suggestion
{
    public required SuggestionType Type { get; set; }
    public required string Name { get; set; }
}
