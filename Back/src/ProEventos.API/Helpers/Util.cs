using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ProEventos.API.Helpers
{
    public class Util : IUtil
    {

        private readonly IWebHostEnvironment _hostEnvironment;

        public Util(IWebHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;

        }

        public void DeleteImage(string imageName, string destino)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @$"Resources/{destino}", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }


        public async Task<string> SaveImage(IFormFile imageNameFile, string destino)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageNameFile.FileName)
                                              .Take(10)
                                              .ToArray()).Replace(' ', '-');
            imageName = $"{imageName}{DateTime.UtcNow.ToString("yymmssfff")}{Path.GetExtension(imageNameFile.FileName)}";
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @$"Resources/{destino}", imageName);

            using (var fileSream = new FileStream(imagePath, FileMode.Create))
            {
                await imageNameFile.CopyToAsync(fileSream);
            }
            return imageName;
        }
    }
}
