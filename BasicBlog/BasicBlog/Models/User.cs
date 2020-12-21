using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BasicBlog.Models
{
    public class User
    {
        public int UserId { get; set; }
        [Required,EmailAddress]
        public string Email { get; set; }
        [Required, Column(TypeName = "varchar"), StringLength(200)]
        public string Username { get; set; }
        [Required, Column(TypeName ="varchar"),StringLength(200)]
        public string Name { get; set; }
        [Required, Column(TypeName = "nvarchar"), StringLength(64)]
        public string Password { get; set; }
        [JsonIgnore]
        public virtual ICollection<Post> Posts { get; set; }
        [JsonIgnore]
        public virtual ICollection<Comment> Comments { get; set; }
    }
}