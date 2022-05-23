using System.Threading.Tasks;
using ProEventos.Application.Dtos;
using ProEventos.Persistence.models;

namespace ProEventos.Application.Contratos
{
    public interface IEventoService
    {
        Task<EventoDto> AddEventos(int userId, EventoDto model);
        Task<EventoDto> UpdateEventos(int userId, int eventoId, EventoDto model);
        Task<bool> DeleteEventos(int userId, int eventoId);

        Task<PageList<EventoDto>> GetAllEventosAsync(int userId, PageParams pageParams, bool includePalestrantes = false);
        Task<EventoDto> GetAllEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = false);
    }
}