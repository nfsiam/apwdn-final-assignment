using BasicBlog.Models;
using BasicBlog.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace BasicBlog.Repositories
{
    public class PostRepository:Repository<Post>
    {
        public void Insert(Post post,User user)
        {
            post.PostTime = DateTime.Now;
            post.UserId = user.UserId;
            this.Insert(post);
        }
        public Post Update(Post post, User user)
        {
            Post oldPost = this.Get(post.PostId);
            if(oldPost == null || oldPost.UserId != user.UserId)
            {
                return null;
            }
            oldPost.PostTitle = post.PostTitle;
            oldPost.PostBody = post.PostBody;
            this.Update(oldPost);

            return oldPost;
        }
    }
}