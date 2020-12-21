using BasicBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BasicBlog.Repositories
{
    public class UserRepository : Repository<User>
    {
        public User ValidateUser(string username,string password)
        {
            User user = this.GetAll().Where(u => u.Username == username && u.Password == password).FirstOrDefault();
            if (user == null)
            {
                return null;
            }
            else
            {
                return user;
            }
        }
    }
}