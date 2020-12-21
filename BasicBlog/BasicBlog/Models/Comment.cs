using Newtonsoft.Json;
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
        public DateTime CommentTime { get; set; }

        [Column(TypeName = "text"), Required,MinLength(1)]
        public string CommentBody { get; set; }
        public int? PostId { get; set; }
        [JsonIgnore]
        public virtual Post Post {get; set;}
        public int? UserId { get; set; }
        public virtual User User { get; set; }
    }
}