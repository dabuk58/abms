public interface IUserService
{
    Task<int?> GetUserIdByExternalIdAsync(string externalId);
}