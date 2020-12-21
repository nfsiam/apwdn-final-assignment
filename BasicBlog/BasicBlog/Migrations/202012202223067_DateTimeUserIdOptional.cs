namespace BasicBlog.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DateTimeUserIdOptional : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Comments", new[] { "UserId" });
            AlterColumn("dbo.Comments", "CommentTime", c => c.DateTime());
            AlterColumn("dbo.Comments", "UserId", c => c.Int());
            AlterColumn("dbo.Posts", "PostTime", c => c.DateTime());
            CreateIndex("dbo.Comments", "UserId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Comments", new[] { "UserId" });
            AlterColumn("dbo.Posts", "PostTime", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Comments", "UserId", c => c.Int(nullable: false));
            AlterColumn("dbo.Comments", "CommentTime", c => c.DateTime(nullable: false));
            CreateIndex("dbo.Comments", "UserId");
        }
    }
}
