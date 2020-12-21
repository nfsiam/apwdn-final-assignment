using BasicBlog.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BasicBlog.Controllers
{
    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {
        private UserRepository userRepository = new UserRepository();

        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(userRepository.GetAll());
        }
    }
}
