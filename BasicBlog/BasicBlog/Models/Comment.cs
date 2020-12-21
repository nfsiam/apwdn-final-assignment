using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BasicBlog.Models
{
    public class Comment
    {
        public int CommentId { get; set; }
        [Required]
        public DateTime CommentTime { get; set; }

        [Column(TypeName = "text"), Required]
        public string CommentBody { get; set; }
        public int? PostId { get; set; }
        public virtual Post Post {get; set;}
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}