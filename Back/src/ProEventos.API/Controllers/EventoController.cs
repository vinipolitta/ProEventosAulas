using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        public IEnumerable<Evento> _evento = new Evento[] {
            new Evento { 
                EventoId = 1,
                Tema = "Angular",
                Local = "SP",
                Lote = "1 lote",
                QtdPessoas = 250,
                DataEvento = DateTime.Now.AddDays(2).ToString(),
                ImagemURL = "foto.png"
            },
                new Evento { 
                EventoId = 2,
                Tema = ".NET Core",
                Local = "RJ",
                Lote = "2 lote",
                QtdPessoas = 210,
                DataEvento = DateTime.Now.AddDays(5).ToString(),
                ImagemURL = "foto1.png"
            },
        };
     
        public EventoController()
        {
            
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
           return _evento;           
           
        }

        [HttpGet("{id}")]
        public IEnumerable<Evento> GetById(int id)
        {
           return _evento.Where(e => e.EventoId == id);         
        }

        [HttpPost]
        public string Post(string teste)
        {
           return teste;
        }

        [HttpPut("{id}")]
        public int Put(int id)
        {
           return id;
        }

        [HttpDelete("{id}")]
        public int  Delete(int id)
        {
           return id;
        }
    }
}
