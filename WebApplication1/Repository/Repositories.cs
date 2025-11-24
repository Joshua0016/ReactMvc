using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApplication1.Interface;
using WebApplication1.Models;

namespace WebApplication1.Repository
{
    public class Repositories<T> : IRepository<T> where T : class
    {
        private readonly AppDbcontext _context;

        public Repositories(AppDbcontext context)
        {
            _context = context;
        }

        public void Create(T entity)
        {
            _context.Set<T>().Add(entity);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var entity = _context.Set<T>().Find(id);
            _context.Set<T>().Remove(entity);
            _context.SaveChanges();
        }

        public IEnumerable<T> GetAll()
        {
            return _context.Set<T>().ToList();
        }

        public T Read(int id)
        {
            return _context.Set<T>().Find(id);
        }

        public void Update(T entity)
        {
            
           
            _context.SaveChanges();
        }
    }
}