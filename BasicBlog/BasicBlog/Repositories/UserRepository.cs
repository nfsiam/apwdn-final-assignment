using BasicBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BasicBlog.Repositories
{
    public class UserRepository : Repository<User>
    {
        public bool ValidateUser(string username,string password)
        {
            if(this.GetAll().Where(u => u.Username == username && u.Password == password).FirstOrDefault() == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}