using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.models;

namespace ProEventos.Persistence
{
    public class PalestrantesPersist : GeralPersist, IPalestrantePersist
    {
        private readonly ProEventosContext _context;

        public PalestrantesPersist(ProEventosContext context) : base(context)
        {
            _context = context;
        }
        public async Task<PageList<Palestrante>> GetAllPalestrantesAsync(PageParams pageParams, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
            .Include(p => p.User)
            .Include(p => p.RedesSociais);

            if (includeEventos)
            {
                query = query.Include(p => p.PalestrantesEventos).ThenInclude(pe => pe.Evento);
            }

            query = query.AsNoTracking()
            .Where(
                p => (p.MiniCurriculo.ToLower().Contains(pageParams.Term.ToLower()) ||
                      p.User.PrimeiroNome.ToLower().Contains(pageParams.Term.ToLower()) ||
                      p.User.UltimoNome.ToLower().Contains(pageParams.Term.ToLower())) &&
                      p.User.Funcao == Domain.Enum.Funcao.palestrante)
            .OrderBy(e => e.Id);

            return await PageList<Palestrante>.CreateAsync(query, pageParams.PageNumber, pageParams.PageSize);
        }

        public async Task<Palestrante> GetPalestranteByUserIdAsync(int userId, bool includeEventos)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
            .Include(p => p.User)
            .Include(p => p.RedesSociais);

            if (includeEventos)
            {
                query = query.Include(p => p.PalestrantesEventos).ThenInclude(pe => pe.Evento);
            }
            query = query.AsNoTracking().OrderBy(p => p.Id).Where(p => p.Id == userId);
            return await query.FirstOrDefaultAsync();
        }
    }
}