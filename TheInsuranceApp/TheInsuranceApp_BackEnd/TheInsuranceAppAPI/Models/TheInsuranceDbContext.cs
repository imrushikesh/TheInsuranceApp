using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TheInsuranceAppAPI.Models
{
    public partial class TheInsuranceDbContext : DbContext
    {
        public TheInsuranceDbContext()
        {
        }

        public TheInsuranceDbContext(DbContextOptions<TheInsuranceDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblClaim> TblClaims { get; set; } = null!;
        public virtual DbSet<TblUser> TblUsers { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=.;Database=TheInsuranceDb;Trusted_Connection=True;Integrated Security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblClaim>(entity =>
            {
                entity.HasKey(e => e.ClaimId)
                    .HasName("PK__tbl_clai__01BDF9D30651748E");

                entity.ToTable("tbl_claim");

                entity.Property(e => e.ClaimId).HasColumnName("claimId");

                entity.Property(e => e.BillImageData).HasColumnName("billImageData");

                entity.Property(e => e.PolicyId)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("policyId");

                entity.Property(e => e.PolicyName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("policyName");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("status");

                entity.Property(e => e.UserName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("userName");
            });

            modelBuilder.Entity<TblUser>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK__tbl_user__CB9A1CFF23D6F568");

                entity.ToTable("tbl_users");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.Role)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("role");

                entity.Property(e => e.UserName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("userName");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
