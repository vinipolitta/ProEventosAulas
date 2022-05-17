using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface ILotePersist
    {
        /// <summary>
        /// Metodo Get que retorna uma lista de lotes por eventoId
        /// </summary>
        /// <param name="eventoId">Codigo chave da tabela Evento</param>
        /// <returns>Lista de lotes</returns>
        Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);
        /// <summary>
        /// Metodo get que retora apenas 1 lote
        /// </summary>
        /// <param name="eventoId">Codigo Chave da tabela evento</param>
        /// <param name="id">codigo chave da tabela lote</param>
        /// <returns>Apenas 1 lote</returns>
        Task<Lote> GetLoteByIdsAsync(int eventoId, int id);
    }
}