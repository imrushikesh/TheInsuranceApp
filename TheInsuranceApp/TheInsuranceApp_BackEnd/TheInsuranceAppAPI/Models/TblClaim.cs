using System;
using System.Collections.Generic;

namespace TheInsuranceAppAPI.Models
{
    public partial class TblClaim
    {
        public int ClaimId { get; set; }
        public string UserName { get; set; } = null!;
        public string Status { get; set; } = null!;
        public byte[] BillImageData { get; set; } = null!;
        public string? PolicyName { get; set; }
        public string? PolicyId { get; set; }
    }
}
