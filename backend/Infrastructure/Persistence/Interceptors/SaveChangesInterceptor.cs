using Domain.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Infrastructure.Persistence.Interceptors;
public class EntitySaveChangesInterceptor(TimeProvider timeProvider) : SaveChangesInterceptor
{
    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        var context = eventData.Context;
        if (context == null)
            return base.SavingChanges(eventData, result);

        foreach (var entry in context.ChangeTracker.Entries())
        {
            if (entry.State == EntityState.Added)
            {
                if (entry.Entity is IAuditableEntity auditableEntity)
                {
                    auditableEntity.CreatedAt = timeProvider.GetUtcNow();
                }
            }

            if (entry.State == EntityState.Modified)
            {
                if (entry.Entity is IAuditableEntity auditableEntity)
                {
                    auditableEntity.UpdatedAt = timeProvider.GetUtcNow();
                }
            }
        }

        return base.SavingChanges(eventData, result);
    }
}
