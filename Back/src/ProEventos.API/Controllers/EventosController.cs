﻿using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Domain;
using ProEventos.Application.Contratos;
using Microsoft.AspNetCore.Http;
using ProEventos.Application.Dtos;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Linq;
using ProEventos.API.Extensions;
using Microsoft.AspNetCore.Authorization;
using ProEventos.Persistence.models;
using ProEventos.API.Helpers;

namespace ProEventos.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {

        private readonly IEventoService _eventoService;
        private readonly IUtil _util;
        private readonly IAccountsService _accountsService;

        private readonly string _destino = "Images";

        public EventosController(IEventoService eventoService,
                                 IUtil util,
                                 IAccountsService accountsService)
        {
            _accountsService = accountsService;
            _eventoService = eventoService;
            _util = util;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PageParams pageParams)
        {
            try
            {
                var eventos = await _eventoService.GetAllEventosAsync(User.GetUserId(), pageParams, true);
                if (eventos == null) return NoContent();

                Response.AddPagination(eventos.CurrentPage, eventos.PageSize, eventos.TotalCount, eventos.TotalPages);

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var evento = await _eventoService.GetAllEventoByIdAsync(User.GetUserId(), id, true);
                if (evento == null) return NoContent();
                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(EventoDto model)
        {
            try
            {
                var evento = await _eventoService.AddEventos(User.GetUserId(), model);
                if (evento == null) return NoContent();
                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar eventos. Erro: {ex.Message}");
            }
        }

        [HttpPost("upload-image/{eventoId}")]
        public async Task<IActionResult> UploadImage(int eventoId)
        {
            try
            {
                var evento = await _eventoService.GetAllEventoByIdAsync(User.GetUserId(), eventoId, true);
                if (evento == null) return NoContent();

                var file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                    _util.DeleteImage(evento.ImagemURL, _destino);
                    evento.ImagemURL = await _util.SaveImage(file, _destino);
                }
                var EventoRetorno = await _eventoService.UpdateEventos(User.GetUserId(), eventoId, evento);
                return Ok(EventoRetorno);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar imagens. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, EventoDto model)
        {
            try
            {
                var evento = await _eventoService.UpdateEventos(User.GetUserId(), id, model);
                if (evento == null) return NoContent();
                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar eventos. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var evento = await _eventoService.GetAllEventoByIdAsync(User.GetUserId(), id, true);
                if (evento == null) return NoContent();

                if (await _eventoService.DeleteEventos(User.GetUserId(), id))
                {
                    _util.DeleteImage(evento.ImagemURL, _destino);
                    return Ok(new { message = "Deletado" });
                }
                else
                {
                    throw new Exception("Algo de errado ao excluir");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar deletar eventos. Erro: {ex.Message}");
            }
        }

    }
}
