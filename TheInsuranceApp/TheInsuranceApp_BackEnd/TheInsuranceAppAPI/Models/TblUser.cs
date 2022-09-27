using System;
using System.Collections.Generic;

namespace TheInsuranceAppAPI.Models
{
    public partial class TblUser
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Role { get; set; } = null!;
    }
}
