using System;
using System.ComponentModel.DataAnnotations;

namespace container_relocate.Models
{
    public class Problem
    {
        [Required]
        public int id { get; set; }
        [Required]
        public int col_size { get; set; }
        [Required]
        public int row_size { get; set; }
        [Required]
        public int[][] data { get; set; }
        /* [Required]
        public int[][] original { get; set; } */
        [Required]
        public int[][] solution { get; set; }
    }
}