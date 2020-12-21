using BasicBlog.Migrations;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BasicBlog.Models
{
    public class BasicBlogDbContext : DbContext
    {
        public BasicBlogDbContext():base("BasicBlogDb")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<BasicBlogDbContext, Configuration>());
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Comment>().HasKey<int>(k => k.CommentId)
                .HasOptional(k => k.Post)
                .WithMany(k => k.Comments)
                .HasForeignKey(k => k.PostId)
                .WillCascadeOnDelete(true)
                ;
        }
    }
}