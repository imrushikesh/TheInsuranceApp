using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheInsuranceAppAPI.Models;

namespace TheInsuranceAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClaimController : Controller
    {
        #region public properties
        public readonly TheInsuranceDbContext _context;
        public readonly ILogger<ClaimController> _logger;
        #endregion

        #region contructor
        public ClaimController(TheInsuranceDbContext context, ILogger<ClaimController> logger)
        {
            _context = context;
            _logger = logger;
        }
        #endregion

        #region actions

        [HttpGet]
        public async Task<IActionResult> GetAllClaims()
        {
            try
            {
                var claim = await _context.TblClaims.ToListAsync();

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
        [Route("{id:int}")]
        public async Task<IActionResult> GetSingleClaim(int id)
        {
            try
            {
                var claim = await _context.TblClaims.FindAsync(id);
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
        [NonAction]
        public FileResult GetFileFromBytes(byte[] bytesIn)
        {
            return File(bytesIn, "image/any");
        }

        [HttpPost]
        public async Task<IActionResult> InsertClaim([FromBody] TblClaim newClaim)
        {
            try
            {
                if (newClaim != null)
                {
                    await _context.TblClaims.AddAsync(newClaim);
                    await _context.SaveChangesAsync();
                    //FileResult imageUserFile = GetFileFromBytes(newClaim.BillImageData);
                    return Ok(newClaim);
                }
                return BadRequest();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception.Message);
                return BadRequest();

            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateClaim([FromBody] TblClaim newClaim)
        {
            try
            {
                if (newClaim != null)
                {
                    var claim = await _context.TblClaims.FindAsync(newClaim.ClaimId);
                    claim.ClaimId = newClaim.ClaimId;
                    claim.Status = newClaim.Status;
                    claim.BillImageData = newClaim.BillImageData;
                    claim.UserName = newClaim.UserName;
                    claim.PolicyId = newClaim.PolicyId;
                    claim.PolicyName = newClaim.PolicyName;
                    _context.TblClaims.Update(claim);
                    await _context.SaveChangesAsync();
                    return Ok(claim);
                }
                return BadRequest();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception.Message);
                return BadRequest();

            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteSingleClaim(int id)
        {
            try
            {
                var claim = await _context.TblClaims.FindAsync(id);
                _context.TblClaims.Remove(claim);
                await _context.SaveChangesAsync();
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

        #endregion
    }
}
