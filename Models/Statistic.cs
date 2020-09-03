using System;
using System.ComponentModel.DataAnnotations;

namespace container_relocate.Models
{
    public class Statistic
    {
        [Required]
        public int problem_count { get; set; }
        [Required]
        public int solved_count { get; set; }
    }
}