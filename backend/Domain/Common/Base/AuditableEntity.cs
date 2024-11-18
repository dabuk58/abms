using Domain.Common.Interfaces;

namespace Domain.Common.Base;
public abstract class AuditableEntity : IAuditableEntity
{
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
}
