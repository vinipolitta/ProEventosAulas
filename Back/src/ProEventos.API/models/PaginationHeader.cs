using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.API.models
{
    public class PaginationHeader
    {
        public PaginationHeader(int currentPage, int intemsPerPage, int totalItems, int totalPages)
        {
            this.CurrentPage = currentPage;
            this.IntemsPerPage = intemsPerPage;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;
        }
        public int CurrentPage { get; set; }
        public int IntemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
    }
}