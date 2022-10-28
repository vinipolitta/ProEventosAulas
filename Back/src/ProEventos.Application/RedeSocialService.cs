using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class RedeSocialService : IRedeSocialService
    {
        private readonly IRedeSocialPersist _redeSocialPersist;
        private readonly IMapper _mapper;
        public RedeSocialService(IRedeSocialPersist redeSocialPersist, IMapper mapper)
        {
            _redeSocialPersist = redeSocialPersist;
            _mapper = mapper;

        }
        public async Task AddRedeSocial(int Id, RedeSocialDto model, bool isEvento)
        {
            try
            {
                var redeSocial = _mapper.Map<RedeSocial>(model);

                if (isEvento)
                {
                    redeSocial.EventoId = Id;
                    redeSocial.PalestranteId = null;
                }
                else
                {
                    redeSocial.PalestranteId = Id;
                    redeSocial.EventoId = null;
                }

                _redeSocialPersist.Add<RedeSocial>(redeSocial);
                await _redeSocialPersist.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<RedeSocialDto[]> SaveByEvento(int eventoId, RedeSocialDto[] models)
        {
            try
            {
                var redeSocials = await _redeSocialPersist.GetAllByEventoIdsAsync(eventoId);
                if (redeSocials == null) return null;

                foreach (var model in models)
                {
                    if (model.Id == 0)
                    {
                        await AddRedeSocial(eventoId, model, true);
                    }
                    else
                    {

                        var redeSocial = redeSocials.FirstOrDefault(redeSocial => redeSocial.Id == model.Id);
                        model.EventoId = eventoId;

                        _mapper.Map(model, redeSocial);

                        _redeSocialPersist.Update<RedeSocial>(redeSocial);

                        await _redeSocialPersist.SaveChangesAsync();
                    }
                }
                var redeSocialRetorno = await _redeSocialPersist.GetAllByEventoIdsAsync(eventoId);
                return _mapper.Map<RedeSocialDto[]>(redeSocialRetorno);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RedeSocialDto[]> SaveByPalestrante(int palestranteId, RedeSocialDto[] models)
        {
            try
            {
                var redeSocials = await _redeSocialPersist.GetAllByPalestranteIdsAsync(palestranteId);
                if (redeSocials == null) return null;

                foreach (var model in models)
                {
                    if (model.Id == 0)
                    {
                        await AddRedeSocial(palestranteId, model, false);
                    }
                    else
                    {
                        var redeSocial = redeSocials.FirstOrDefault(redeSocial => redeSocial.Id == model.Id);
                        model.PalestranteId = palestranteId;

                        _mapper.Map(model, redeSocial);

                        _redeSocialPersist.Update<RedeSocial>(redeSocial);

                        await _redeSocialPersist.SaveChangesAsync();
                    }
                }
                var redeSocialRetorno = await _redeSocialPersist.GetAllByPalestranteIdsAsync(palestranteId);
                return _mapper.Map<RedeSocialDto[]>(redeSocialRetorno);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> DeleteByEvento(int eventoId, int redeSocialId)
        {
            try
            {
                var RedeSocial = await _redeSocialPersist.GetRedeSocialEventoByIdsAsync(eventoId, redeSocialId);
                if (RedeSocial == null) throw new Exception("Rede Social por evento evento para delete nao foi encontrado");

                _redeSocialPersist.Delete<RedeSocial>(RedeSocial);
                return await _redeSocialPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteByPalestrante(int palestranteId, int redeSocialId)
        {
            try
            {
                var RedeSocial = await _redeSocialPersist.GetRedeSocialPalestranteByIdsAsync(palestranteId, redeSocialId);
                if (RedeSocial == null) throw new Exception("Rede Social por palalestrante para delete nao foi encontrado");

                _redeSocialPersist.Delete<RedeSocial>(RedeSocial);
                return await _redeSocialPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<RedeSocialDto[]> GetAllByEventoIdsAsync(int eventoId)
        {
            try
            {
                var redeSocial = await _redeSocialPersist.GetAllByEventoIdsAsync(eventoId);
                if (redeSocial == null) return null;

                var resultado = _mapper.Map<RedeSocialDto[]>(redeSocial);

                return resultado;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RedeSocialDto[]> GetAllPalestrantesIdAsync(int palestranteId)
        {
            try
            {
                var redeSocial = await _redeSocialPersist.GetAllByPalestranteIdsAsync(palestranteId);
                if (redeSocial == null) return null;

                var resultado = _mapper.Map<RedeSocialDto[]>(redeSocial);

                return resultado;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<RedeSocialDto> GetRedeSocialEventoByIdsAsync(int eventoId, int redeSocialId)
        {
            try
            {
                var redeSocial = await _redeSocialPersist.GetRedeSocialEventoByIdsAsync(eventoId, redeSocialId);
                if (redeSocial == null) return null;

                var resultado = _mapper.Map<RedeSocialDto>(redeSocial);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RedeSocialDto> GetRedeSocialPalestranteByIdsAsync(int PalestranteId, int redeSocialId)
        {
            try
            {
                var redeSocial = await _redeSocialPersist.GetRedeSocialPalestranteByIdsAsync(PalestranteId, redeSocialId);
                if (redeSocial == null) return null;

                var resultado = _mapper.Map<RedeSocialDto>(redeSocial);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


    }
}