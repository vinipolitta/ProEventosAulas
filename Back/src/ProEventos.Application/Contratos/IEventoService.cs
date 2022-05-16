using System.Threading.Tasks;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Contratos
{
    public interface IEventoService
    {
        Task<EventoDto> AddEventos(EventoDto model);
        Task<EventoDto> UpdateEventos(int eventoId, EventoDto model);
        Task<bool> DeleteEventos(int eventoId);

        Task<EventoDto[]> GetAllEventosAsync( bool includePalestrantes = false);
        Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);
        Task<EventoDto> GetAllEventoByIdAsync(int eventoId, bool includePalestrantes = false);
    }
}