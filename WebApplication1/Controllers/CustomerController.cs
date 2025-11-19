using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using WebApplication1.Repository;

namespace WebApplication1.Controllers
{
    public class CustomerController : Controller
    {
        private readonly Repositories<Customer> _repo;

        public CustomerController()
        {
            var context = new AppDbcontext();
            this._repo = new Repositories<Customer>(context);
        }
        // GET: Customer
        [HttpGet]
        public JsonResult GetAll()
        {
            Response.StatusCode = 200;
            return Json(_repo.GetAll(), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult Get(int id)
        {
            var customer = _repo.Read(id);
            if(customer == null)
            {
                Response.StatusCode = 404;
                return Json(new { success = false, message = "Cliente not found" });
            }
            else
            {
                Response.StatusCode = 200;
                return Json(customer, JsonRequestBehavior.AllowGet);
            }
            

        }
        [HttpPost]
        public JsonResult Create(Customer customer)
        {
            var getCustomer = _repo.GetAll();
            //validación de nombre único
            if (!ModelState.IsValid || getCustomer.Any((x) => x.Name == customer.Name))
            {
                Response.StatusCode = 404;
                return Json(new { success = false, message = "Datos inválidos" });

            }
            else
            {
                _repo.Create(customer);
                Response.StatusCode = 200;
                return Json(new { success = true, message = "Customer creado correctamente" });
            }
        }
        [HttpPut]
        public JsonResult Update(Customer customer)
        {
            var getCustomer = _repo.Read(customer.Id);
            if (!ModelState.IsValid || getCustomer == null)
            {
                Response.StatusCode = 404;
                return Json(new { success = false, message = "Datos inválidos" });

            }
            else
            {
                _repo.Update(customer);
                Response.StatusCode = 200;
                return Json(new { success = true, message = "Cliente actualizado correctamente" });
            }
        }
        [HttpDelete]
        public JsonResult Delete(int id) 
        { 
            var getCustomer = _repo.Read(id);
            if (getCustomer == null)
            {
                Response.StatusCode = 404;
                return Json(new { success = false, message = "El customer que intenta eliminar no existe" });
            }
            else
            {
                _repo.Delete(id);
                Response.StatusCode = 200;
                return Json(new { success = true, message = "Cliente eliminado correctamente" });
            }
        }
    }
}