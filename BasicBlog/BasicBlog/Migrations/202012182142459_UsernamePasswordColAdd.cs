namespace BasicBlog.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UsernamePasswordColAdd : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Username", c => c.String(nullable: false, maxLength: 200, unicode: false));
            AddColumn("dbo.Users", "Password", c => c.String(nullable: false, maxLength: 64));
            AlterColumn("dbo.Users", "Email", c => c.String(nullable: false));
            AlterColumn("dbo.Users", "Name", c => c.String(nullable: false, maxLength: 200, unicode: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Users", "Name", c => c.String());
            AlterColumn("dbo.Users", "Email", c => c.String());
            DropColumn("dbo.Users", "Password");
            DropColumn("dbo.Users", "Username");
        }
    }
}
