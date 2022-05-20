using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatorio")]
        public string Local { get; set; }
        public string DataEvento { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatorio"),
        StringLength(50, MinimumLength = 3, ErrorMessage = "Intervalo permitudo de 3 a 50 caracteres")]
        public string Tema { get; set; }

        [Display(Name = "Qtd pessoas")]
        [Range(1,1200, ErrorMessage = "{0} nao pode ser menor que 1 ou maior que 1200.")]
        public int QtdPessoas{ get; set; }

        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage ="Nao é uma imagem valida. (gif, jpg, jpeg, bmp, ou png).")]
        public string ImagemURL { get; set; } 
        public string statusEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatorio"),
        Phone(ErrorMessage = "Telefone esta com numero invalido")]
        public string Telefone{ get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatorio"),
        Display(Name = "e-mail"),
        EmailAddress(ErrorMessage = "É nescessario ser um {0} válido")]
        public string Email { get; set; }
        public int UserId { get; set; }
        public UserDto UserDtoS { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedeSociais { get; set; }
        public IEnumerable<PalestranteDto> PalestrantesEventos { get; set; }
    }
}