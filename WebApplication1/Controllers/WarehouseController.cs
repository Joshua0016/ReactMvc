using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using WebApplication1.Repository;

namespace WebApplication1.Controllers
{
    public class WarehouseController : Controller
    {
        private readonly Repositories<Warehouse> _repo;
        // GET: Warehouse
        public WarehouseController()
        {
            var context = new AppDbcontext();
            this._repo = new Repositories<Warehouse>(context);
        }
        [HttpGet]
        public JsonResult GetAll()
        {
            return Json(_repo.GetAll(), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult Get(int id)
        {
            var entity = _repo.Read(id);
            if(entity == null)
            {
                Response.StatusCode = 404;
                return Json(new { success = false, message="Datos inválidos" });
            }
            else
            {
                Response.StatusCode = 200;
                return Json(entity, JsonRequestBehavior.AllowGet);
                
            }
        }
        [HttpPost]
        public JsonResult Create(Warehouse entity)
        {
            var warehouse = _repo.Read(entity.Id);
            if(!ModelState.IsValid || warehouse != null || _repo.GetAll().Any((x) => x.Name == entity.Name))
            {
                Response.StatusCode = 404;
                return Json(new { success = false, message = "Datos iválidos" });
            }
            else
            {
                _repo.Create(entity);
                Response.StatusCode = 200;
                return Json(new { success = true, message = "Almacén creado correctamente" });
            }
        }
        [HttpPut]
        public JsonResult Update(Warehouse entity)
        {
            var warehouse = _repo.Read(entity.Id);
            if (!ModelState.IsValid || warehouse == null)
            {
                Response.StatusCode = 404;
                return Json(new { success = false, message = "Datos inválidos" });
            }
            else
            {
                Response.StatusCode = 200;
                _repo.Update(entity);
                return Json(new { success = true, message = "Almacén creado correctamente" });
            }
        }
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var entity = _repo.Read(id);
            if (entity == null)
            {
                Response.StatusCode = 404;
                return Json(new { success = false, messsage = "Datos inválidos" });
            }
            else
            {
                _repo.Delete(id);
                Response.StatusCode = 200;
                return Json(new { success = true, message = "Almacén eliminado correctamente" });

            }

        }
    }
}