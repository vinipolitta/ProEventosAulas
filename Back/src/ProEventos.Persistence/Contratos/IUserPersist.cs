using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain.Identity;

namespace ProEventos.Persistence.Contratos
{
    public interface IUserPersist : IGeralPersist
    {
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUsersByIdAsync(int id);
        Task<User> GetUsersByUsernameAsync(string username);
    }
}