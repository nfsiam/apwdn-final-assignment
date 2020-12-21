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
    [RoutePrefix("{posts}/{id}/{comments}"),BasicAuth]
    public class CommentController : ApiController
    {
        private CommentRepository commentRepository = new CommentRepository();
        [Route("")]
        public IHttpActionResult Get(int id)
        {
            return Ok(commentRepository.GetAll().Where(c=>c.PostId == id));
        }
        [Route("{cid}", Name = "GetCommentById")]
        public IHttpActionResult GetCommentById(int id,int cid)
        {
            Comment comment = commentRepository.Get(cid);
            if(comment != null && comment.PostId == id)
            {
                return Ok(comment);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }
        [Route("")]
        public IHttpActionResult Post(Comment comment)
        {
            if (ModelState.IsValid)
            {
                this.commentRepository.Insert(comment, Request.Properties["user"] as User);
                return Created("posts/" + comment.PostId + "comments/" + comment.CommentId, comment);
            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        [Route("{cid}")]
        public IHttpActionResult Put([FromUri] int cid, [FromBody] Comment comment)
        {
            comment.CommentId = cid;

            if (ModelState.IsValid)
            {
                Comment _comment = this.commentRepository.Update(comment, Request.Properties["user"] as User);
                if(_comment == null)
                {
                    return BadRequest();
                }
                return Ok(_comment);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Route("{cid}")]
        public IHttpActionResult Delete(int cid)
        {
            //Comment comment = commentRepository.Get(cid);
            //if(comment == null)
            //{
            //    return StatusCode(HttpStatusCode.NoContent);
            //}
            commentRepository.Delete(cid);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
