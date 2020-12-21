using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BasicBlog.Models
{
    public class Post
    {
        [Key]
        public int PostId { get; set; }
        [Required]
        public DateTime PostTime { get; set; }

        [Column(TypeName = "varchar"), Required,StringLength(1000)]
        public string PostTitle { get; set; }

        [Column(TypeName ="text"),Required]
        public string PostBody { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public int? UserId { get; set; }
        public virtual User User {get; set;}
    }
}