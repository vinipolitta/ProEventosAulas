using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.models;

namespace ProEventos.Application
{
    public class PalestranteService : IPalestranteService
    {
        private readonly IPalestrantePersist _palestrantePersist;
        private readonly IMapper _mapper;
        public PalestranteService(IPalestrantePersist palestrantePersist, IMapper mapper)
        {

            _palestrantePersist = palestrantePersist;
            _mapper = mapper;

        }
        public async Task<PalestranteDto> AddPalestrante(int userId, PalestranteAddDto model)
        {
            try
            {
                var palestrante = _mapper.Map<Palestrante>(model);
                palestrante.UserId = userId;

                _palestrantePersist.Add<Palestrante>(palestrante);

                if (await _palestrantePersist.SaveChangesAsync())
                {
                    var PalestranteRetorno = await _palestrantePersist.GetPalestranteByUserIdAsync(userId, false);
                    return _mapper.Map<PalestranteDto>(PalestranteRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<PalestranteDto> UpdatePalestrante(int userId, PalestranteUpdateDto model)
        {
            try
            {
                var palestrante = await _palestrantePersist.GetPalestranteByUserIdAsync(userId, false);
                if (palestrante == null) return null;

                model.Id = palestrante.Id;
                model.UserId = userId;
                _mapper.Map(model, palestrante);

                _palestrantePersist.Update<Palestrante>(palestrante);


                if (await _palestrantePersist.SaveChangesAsync())
                {
                    var PalestranteRetorno = await _palestrantePersist.GetPalestranteByUserIdAsync(userId, false);
                    return _mapper.Map<PalestranteDto>(PalestranteRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PageList<PalestranteDto>> GetAllPalestrantesAsync(PageParams pageParams, bool includeEventos = false)
        {
            try
            {
                var eventos = await _palestrantePersist.GetAllPalestrantesAsync(pageParams, includeEventos);
                if (eventos == null) return null;

                var resultado = _mapper.Map<PageList<PalestranteDto>>(eventos);

                resultado.CurrentPage = eventos.CurrentPage;
                resultado.TotalPages = eventos.TotalPages;
                resultado.PageSize = eventos.PageSize;
                resultado.TotalCount = eventos.TotalCount;

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PalestranteDto> GetPalestranteByUserIdAsync(int userId, bool includeEventos = false)
        {
            try
            {
                var palestrante = await _palestrantePersist.GetPalestranteByUserIdAsync(userId, includeEventos);
                if (palestrante == null) return null;

                var resultado = _mapper.Map<PalestranteDto>(palestrante);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}