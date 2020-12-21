using BasicBlog.Attributes;
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
    [RoutePrefix("posts"),BasicAuth]
    public class PostController : ApiController
    {
        private PostRepository postRepository = new PostRepository();
        [Route("")]
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
            if(ModelState.IsValid)
            {
                this.postRepository.Insert(post, Request.Properties["user"] as User);
                string uri = Url.Link("GetPostById", new { id = post.PostId });
                return Created(uri, post);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Route("{id}")]
        public IHttpActionResult Put([FromUri] int id, [FromBody] Post post)
        {
            post.PostId = id;
            //post.UserId = ((User)Request.Properties["user"]).UserId;
            //postRepository.Update(post);
            //return Ok(post);
            if (ModelState.IsValid)
            {
                Post _post = this.postRepository.Update(post, Request.Properties["user"] as User);
                if(_post == null)
                {
                    return BadRequest();
                }
                string uri = Url.Link("GetPostById", new { id = post.PostId });
                return Ok(_post);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            postRepository.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
