using BasicBlog.Models;
using BasicBlog.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BasicBlog.Controllers
{
    [RoutePrefix("posts")]
    public class PostController : ApiController
    {
        private PostRepository postRepository = new PostRepository();
        [Route("")]
        [Route("~/")]
        public IHttpActionResult Get()
        {
            return Ok(this.postRepository.GetAll());
        }
        [Route("{id}",Name = "GetPostById")]
        public IHttpActionResult Get(int id)
        {
            Post post = this.postRepository.Get(id);
            if(post == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(post);
            }
        }

        [Route("")]
        public IHttpActionResult Post(Post post)
        {
            this.postRepository.Insert(post);
            string uri = Url.Link("GetPostById", new { id = post.PostId });
            return Created(uri, post);
        }

        [Route("{id}")]
        public IHttpActionResult Put([FromUri] int id, [FromBody] Post post)
        {
            post.PostId = id;
            postRepository.Update(post);
            return Ok(post);
        }

        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            postRepository.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
