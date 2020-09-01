using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using container_relocate.Models;
using container_relocate.Services;

namespace container_relocate.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProblemController : ControllerBase
    {
        private readonly IProblemService _problemService;

        public ProblemController(IProblemService problemService)
        {
            this._problemService = problemService;
        }

        // GET api/problem
        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<Problem>>> Getstrings()
        {
            var items = await this._problemService.ListProblems();

            return Ok(items.ToArray());
        }

    }
}