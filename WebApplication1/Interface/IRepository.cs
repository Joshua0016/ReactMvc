using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApplication1.Interface
{
    internal interface IRepository<T> where T : class
    {
        void Create(T entity);
        IEnumerable<T> GetAll();
        T Read(int id);
        void Delete(int id);
        void Update(T entitly);
    }
}
