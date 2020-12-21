namespace BasicBlog.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MinLength : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Posts", "PostTitle", c => c.String(nullable: false, maxLength: 200, unicode: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Posts", "PostTitle", c => c.String(nullable: false, maxLength: 1000, unicode: false));
        }
    }
}
