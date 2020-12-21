namespace BasicBlog.Migrations
{
    using BasicBlog.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<BasicBlog.Models.BasicBlogDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(BasicBlog.Models.BasicBlogDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.
            context.Users.AddOrUpdate(x => x.UserId,
                new User() { UserId = 1,  Username="jane", Name = "Jane Austen", Password = "1234" },
                new User() { UserId = 2,  Username = "charles", Name = "Charles Dickens" , Password = "1234"},
                new User() { UserId = 3,  Username = "miguel", Name = "Miguel de Cervantes", Password = "1234" },
                new User() { UserId = 4,  Username = "siam", Name = "Nafiz Fuad Siam", Password = "1234" }
            );
            context.Posts.AddOrUpdate(x => x.PostId,
                new Post()
                { 
                    PostId=1,
                    PostTime= new DateTime(2020,12,18),
                    PostTitle ="Sample Post 1",
                    PostBody="This is a sample post Body 1",
                    UserId=1
                },
                new Post()
                {
                    PostId = 2,
                    PostTime = new DateTime(2020, 12, 18),
                    PostTitle = "Sample Post 2",
                    PostBody = "This is a sample post Body 2",
                    UserId = 2
                }
            );
            context.Comments.AddOrUpdate(x => x.CommentId,
                new Comment()
                {
                    CommentId = 1,
                    CommentTime = new DateTime(2020, 12, 18),
                    CommentBody = "This is comment 1 from user 2 in post 1",
                    PostId = 1,
                    UserId = 2
                },
                new Comment()
                {
                    CommentId = 2,
                    CommentTime = new DateTime(2020, 12, 18),
                    CommentBody = "This is comment 2 from user 3 in post 1",
                    PostId = 1,
                    UserId = 3
                },
                new Comment()
                {
                    CommentId = 3,
                    CommentTime = new DateTime(2020, 12, 18),
                    CommentBody = "This is comment 3 from user 1 in post 2",
                    PostId = 2,
                    UserId = 1
                }
            );
        }
    }
}
