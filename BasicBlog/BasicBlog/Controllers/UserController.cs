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
    [RoutePrefix("users")]
    public class UserController : ApiController
    {
        private UserRepository userRepository = new UserRepository();

        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(userRepository.GetAll());
        }
        [Route("login")]
        public IHttpActionResult Post(User user)
        {
            User _user = userRepository.ValidateUser(user.Username, user.Password);
            if(_user == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(user);
        }
        [Route("register")]
        public IHttpActionResult PostReg(User user)
        {
            userRepository.Insert(user);
            return Created("/",user);
        }
    }
}
