using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheInsuranceAppAPI.Models;
namespace TheInsuranceAppAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class userController : Controller
    {
        #region public properties
        public readonly TheInsuranceDbContext _context;
        public readonly ILogger<ClaimController> _logger;
        #endregion

        #region contructor
        public userController(TheInsuranceDbContext context, ILogger<ClaimController> logger)
        {
            _context = context;
            _logger = logger;
        }
        #endregion

        #region actions

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var claim = await _context.TblUsers.ToListAsync();
                if (claim != null)
                {
                    return Ok(claim);
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception.Message);
                return NotFound();

            }
        }

        [HttpGet]
        public async Task<IActionResult> GetUserRole([FromQuery] user User)
        {
            try
            {
                var user = await _context.TblUsers.Where(u => u.UserName.Equals(User.UserName) && u.Password.Equals(User.PassWord)).ToListAsync();
                if (user != null && user.Count>0)
                {
                    return Ok(user);
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception.Message);
                return NotFound();
            }
        }

        #endregion

    }
}
