using BasicBlog.Models;
using BasicBlog.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;

namespace BasicBlog.Repositories
{
    public class CommentRepository:Repository<Comment>
    {
        public void Insert(Comment comment, User user)
        {
            comment.CommentTime = DateTime.Now;
            comment.UserId = user.UserId;
            this.Insert(comment);
            comment.User = user;
        }
        public Comment Update(Comment comment, User user)
        {
            Comment oldComment = this.Get(comment.CommentId);
            if (oldComment == null || oldComment.UserId != user.UserId)
            {
                return null;
            }
            oldComment.CommentBody = comment.CommentBody;
            this.Update(oldComment);
            oldComment.User = user;

            return oldComment;
        }
    }
}