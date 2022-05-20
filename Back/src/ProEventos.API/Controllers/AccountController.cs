using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountsService _accountService;
        private readonly ITokenService _tokenService;

        public AccountController(IAccountsService accountService,
                                ITokenService tokenService)
        {
            _accountService = accountService;
            _tokenService = tokenService;
        }

        [HttpGet("GetUser/{userName}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUser(string userName)
        {
            try
            {
                var user = await _accountService.GetUserByUsernameAsync(userName);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return  this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar usuario. Erro: {ex.Message}");
            }
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            try
            {
                if (await _accountService.UserExists(userDto.Username))
                    return BadRequest("Usuário já existe");

                var user = await _accountService.CreateAccountAsync(userDto);
                if (user != null)
               
                    return Ok(user);
                
                return BadRequest("Usuario nao criado, tente novamente mais tarde!!!");
            }
            catch (Exception ex)
            {
                return  this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar usuario. Erro: {ex.Message}");
            }
        }
    }
}